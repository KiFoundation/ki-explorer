import qs from 'querystring';
import React,{ Component } from 'react';
import { HTTP } from 'meteor/http'
import {
    Badge,
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // Input,
    // InputGroup,
    // InputGroupAddon,
    // Button,
    UncontrolledDropdown,
    UncontrolledPopover,
    PopoverBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import i18n from 'meteor/universe:i18n';
import LedgerModal from '../ledger/LedgerModal.jsx';
import Account from './Account.jsx';
import MenuIcon from 'mdi-react/MenuIcon';

const T = i18n.createComponent();

// Firefox does not support named group yet
// const SendPath = new RegExp('/account/(?<address>\\w+)/(?<action>send)')
// const DelegatePath = new RegExp('/validators?/(?<address>\\w+)/(?<action>delegate)')
// const WithdrawPath = new RegExp('/account/(?<action>withdraw)')

const SendPath = new RegExp('/account/(\\w+)/(send)')
const DelegatePath = new RegExp('/validators?/(\\w+)/(delegate)')
const WithdrawPath = new RegExp('/account/(withdraw)')

const getUser = () => localStorage.getItem(CURRENTUSERADDR)

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            networks: "",
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        }, ()=>{
            // console.log(this.state.isOpen);
        });
    }

    toggleSignIn = (value) => {
        this.setState(( prevState) => {
            return {isSignInOpen: value!=undefined?value:!prevState.isSignInOpen}
        })
    }

    handleLanguageSwitch(lang, e) {
        i18n.setLocale(lang)
    }

    componentDidMount(){
        let networks = Meteor.settings.public.networks;

        this.setState({
            networks: <DropdownMenu className="w-100">{
                networks.map((network, i) => {
                    return <span key={i}>

                        {network.links.map((link, k) => {
                            return <DropdownItem  key={k} disabled={link.chain_id == Meteor.settings.public.chainId}>
                                <a href={link.url} target="_blank">{link.chain_id} <span style={{float:'right'}}><Badge size="xs" color="secondary">{link.name}</Badge></span></a>
                            </DropdownItem>})}
                        {(i < networks.length - 1)?<DropdownItem divider />:''}
                    </span>

                })
            }</DropdownMenu>
        })

    }

    signOut () {
        localStorage.removeItem(CURRENTUSERADDR);
        localStorage.removeItem(CURRENTUSERPUBKEY);
        this.props.refreshApp();
    }

    shouldLogin = () => {
        let pathname = this.props.location.pathname
        let groups;
        let match = pathname.match(SendPath) || pathname.match(DelegatePath)|| pathname.match(WithdrawPath);
        if (match) {
            if (match[0] === '/account/withdraw') {
                groups = {action: 'withdraw'}
            } else {
                groups = {address: match[1], action: match[2]}
            }
        }
        let params = qs.parse(this.props.location.search.substr(1))
        return groups || params.signin != undefined
    }

    handleLoginConfirmed = (success) => {
        let groups = this.shouldLogin()
        if (!groups) return
        let redirectUrl;
        let params;
        if (groups) {
            let { action, address } = groups;
            params = {action}
            switch (groups.action) {
                case 'send':
                    params.transferTarget = address
                    redirectUrl = `/account/${address}`
                    break
                case 'withdraw':
                    redirectUrl = `/account/${getUser()}`
                    break;
                case 'delegate':
                    redirectUrl = `/validators/${address}`
                    break;
            }
        } else {
            let location = this.props.location;
            params = qs.parse(location.search.substr(1))
            redirectUrl = params.redirect?params.redirect:location.pathname;
            delete params['redirectUrl']
            delete params['signin']
        }

        let query = success?`?${qs.stringify(params)}`:'';
        this.props.history.push(redirectUrl + query)
    }

    render() {
        let signedInAddress = getUser();
        return (
            <React.Fragment>
                <Navbar expand="lg" id="header" className="px-0 pt-0 mb-3 justify-content-between" style={{border: 0, boxShadow: 'none'}}>
                    <NavbarBrand tag={Link} to="/">
                        <img src="/img/ki-chain.png" className="img-fluid logo"/>
                    </NavbarBrand>
                    <Nav>
                        <NavItem className="d-none d-sm-block">
                            <SearchBar style={{minWidth: 250}} id="header-search" history={this.props.history} />
                        </NavItem>
                        <NavItem className="ml-3 vertical-align">
                            <div className="ml-md-3">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen})} className="d-inline text-nowrap">
                                    <DropdownToggle style={{boxShadow: 'none', border: '1px solid #eaeaea'}} ><span className="font-800 dark-color mr-2 text-capitalize">Network</span> <span className="font-800 primary-color text-capitalize mr-4">{Meteor.settings.public.chainId}</span><i style={{opacity: 0.3}} className={`fas ${this.state.dropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                    </DropdownToggle>
                                    {this.state.networks}
                                </Dropdown>
                            </div>
                        </NavItem>
                    </Nav>
                </Navbar>
            </React.Fragment>
        );
    }
}
