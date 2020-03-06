import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button } from 'reactstrap';
import HeaderRecord from './HeaderRecord.jsx';
import Blocks from '/imports/ui/blocks/ListContainer.js'
import { LoadMore } from '../components/LoadMore.jsx';
import { Route, Switch } from 'react-router-dom';
import Sidebar from "react-sidebar";
import Block from './BlockContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class BlocksTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: Meteor.settings.public.initialPageSize,
            sidebarOpen: (props?.location?.pathname?.split("/blocks/")?.length == 2)
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
    }

    static defaultProps = {
        showChainStates: true,
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
      
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }
    
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    
    trackScrolling = () => {
        if (!this.props.limit) {
            const wrappedElement = document.getElementById('block-table');
            if (this.isBottom(wrappedElement)) {
                // console.log('header bottom reached');
                document.removeEventListener('scroll', this.trackScrolling);
                this.setState({loadmore:true});
                this.setState({
                    limit: this.state.limit+10
                }, (err, result) => {
                    if (!err){
                        document.addEventListener('scroll', this.trackScrolling);
                    }
                    if (result){
                        this.setState({loadmore:false});
                    }
                })
            }
        }
    };

    componentDidUpdate(prevProps){
        if (this.props?.location?.pathname != prevProps?.location?.pathname){
            this.setState({
                sidebarOpen: (this.props?.location?.pathname?.split("/blocks/")?.length == 2)
            })
        }
    }

    handleShowMore() {
        let timer = Meteor.setTimeout(() => {
            this.props.history.push('/blocks');
            Meteor.clearTimeout(timer);
        },100)
    }

    onSetSidebarOpen(open) {
        // console.log(open);
        this.setState({ sidebarOpen: open }, (error, result) =>{
            let timer = Meteor.setTimeout(() => {
                if (!open){
                    this.props.history.push('/blocks');
                }
                Meteor.clearTimeout(timer);
            },500)
        }); 
    }

    render(){
        return <div>
            <Helmet>
                <title>Latest Blocks on Ki Chain</title>
                <meta name="description" content="Latest blocks committed by validators on Ki Chain" />
            </Helmet>
            <Row>
                <Col className="vertical-align justify-start">
                    <h2 className="d-none d-lg-block dark-color mb-0 font-800">{this.props.title || <T>blocks.latestBlocks</T>}</h2>
                    { !this.props.showChainStates && <Button className="ml-auto normal-shadow" onClick={this.handleShowMore}>
                            <span className="dark-color text-normalize font-800 vertical-align translate-none">
                                <i className="material-icons light-color mr-2">add_circle</i><T>common.seeMore</T>
                            </span>
                        </Button>
                    }
                </Col>
                { this.props.showChainStates && <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col> }
            </Row>
            <Switch>
                <Route path="/blocks/:blockId" render={(props)=> <Sidebar 
                    sidebar={<Block {...props} />}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { 
                        background: "white", 
                        position: "fixed",
                        width: '85%',
                        zIndex: 4
                    }, overlay:{
                        zIndex: 3
                    } }}
                >
                </Sidebar>} />
            </Switch>
            <Container fluid id="block-table" className="mt-4 pt-1">
                <HeaderRecord />
                <Blocks history={this.props.history} limit={this.state.limit} />
            </Container>
            <LoadMore show={this.state.loadmore} />
        </div>
    }
}
