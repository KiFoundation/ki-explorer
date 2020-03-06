import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Nav, NavItem, NavLink, Card } from 'reactstrap';
import List from './ListContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import qs from 'querystring';

const T = i18n.createComponent();

const PriorityEnum = {
    'moniker': {code: 0, dirKey: 'monikerDir', name: 'moniker'},
    'votingPower': {code: 1, dirKey: 'votingPowerDir', name: 'votingPower'},
    'uptime': {code: 2, dirKey: 'uptimeDir', name: 'uptime'},
    'commission': {code: 3, dirKey: 'commissionDir', name: 'commission'},
    'selfDel': {code: 4, dirKey: 'selfDelDir', name: 'selfDel'},
    'status': {code: 5, dirKey: 'statusDir', name: 'status'},
    'jailed': {code: 6, dirKey: 'jailedDir', name: 'jailed'}
}

const renderToggleIcon = (order) =>
    <i className="material-icons"> {(order == 1)?'arrow_drop_up':'arrow_drop_down'}</i>;

export default class Validators extends Component{
    constructor(props){
        super(props);
        let state = {
            monikerDir: 1,
            votingPowerDir: -1,
            uptimeDir: -1,
            commissionDir: 1,
            selfDelDir: 1,
            statusDir: 1,
            jailedDir: 1,
            priority: PriorityEnum.moniker.code
        }
        if (props.location.search) {
            let queryParams = qs.parse(props.location.search.substring(1));
            let sortField = queryParams.sort;
            if (sortField && PriorityEnum[sortField]) {
                state.priority = PriorityEnum[sortField].code;
                if (queryParams.dir && Number(queryParams.dir)) {
                    state[PriorityEnum[sortField].dirKey] = Number(queryParams.dir) > 0?1:-1;
                }
            }
        }
        this.state = state;
    }

    toggleDir(field, e){
        e.preventDefault();
        if (!PriorityEnum[field])
            return;

        let dirKey = PriorityEnum[field].dirKey;
        let newDir = this.state[dirKey] * -1;
        this.setState({
            [dirKey]: newDir,
            priority: PriorityEnum[field].code
        });
        this.props.history.replace({
            search: qs.stringify({
                sort: field,
                dir: newDir
            })
        });
    }

    render() {
        let title = <T>validators.active</T>;
        let desc = <T>validators.listOfActive</T>;
        if (this.props.inactive){
            title = <T>validators.inactive</T>;
            desc = <T>validators.listOfInactive</T>;
        }

        return <div id="validator-list">
            <Helmet>
                <title>Cosmos Validator List | The Big Dipper</title>
                <meta name="description" content="Here is a list of Cosmos Validators" />
            </Helmet>
            <Row>
                <Col lg={4} xs={12} className="vertical-align justify-start"><h2 className="d-none d-lg-block mb-0 dark-color font-800">{title}</h2></Col>
                <Col lg={8} xs={12} className="text-lg-right"><ChainStates /></Col>
            </Row>
            <Nav pills className="status-switch filter-pills mt-4 pt-1">
                <NavItem className="ml-auto">
                    <NavLink
                        style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                        tag={Link}
                        to="/validators"
                        active={(this.props.match.url == "/validators")}><T>validators.navActive</T>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/validators/inactive"
                        style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                        active={(this.props.match.url.indexOf("inactive")>0)}>
                        <T>validators.navInactive</T>
                    </NavLink>
                </NavItem>
            </Nav>
            {/* <p className="lead">{desc}</p> */}
            <Row className="validator-list">
                <Col md={12}>
                    <Row className="header text-nowrap mb-3 mt-4" style={{border: 0}}>
                        <Col className="vertical-middle d-none d-md-block counter" md={1}>&nbsp;</Col>
                        <Col className="vertical-middle moniker" md={2} onClick={(e) => this.toggleDir('moniker',e)}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.moniker</T></span> {renderToggleIcon(this.state.monikerDir)} </Col>
                        <Col className="vertical-middle voting-power" md={3} lg={2} onClick={(e) => this.toggleDir('votingPower',e)}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>common.votingPower</T></span> {renderToggleIcon(this.state.votingPowerDir)} </Col>
                        <Col className="vertical-middle self-delegation" md={1} onClick={(e) => this.toggleDir('selfDel',e)}><span className="d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.selfPercentage</T></span> {renderToggleIcon(this.state.selfDelDir==1)} </Col>
                        {(!this.props.inactive)?<Col className="vertical-middle commission" md={1} lg={2} onClick={(e) => this.toggleDir('commission',e)}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.commission</T></span> {renderToggleIcon(this.state.commissionDir==1)}</Col>:''}
                        {/* {(!this.props.inactive)?<Col className="vertical-middle uptime" md={2} lg={3} onClick={(e) => this.toggleDir('uptime',e)}><span className="d-inline-block d-md-none d-lg-inline-block "><T>validators.uptime</T> ({Meteor.settings.public.uptimeWindow} <i className="fas fa-cube"></i>)</span> {renderToggleIcon(this.state.uptimeDir==1)}</Col>:''} */}
                        {(!this.props.inactive)?<Col className="vertical-middle uptime" md={2} lg={3} onClick={(e) => this.toggleDir('uptime',e)}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.uptime</T> </span> {renderToggleIcon(this.state.uptimeDir==1)}</Col>:''}
                        {(this.props.inactive)?<Col className="vertical-middle last-seen" md={3}><span className="d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.lastSeen</T> (UTC)</span></Col>:''}
                        {(this.props.inactive)?<Col className="vertical-middle bond-status" md={1} onClick={(e) => this.toggleDir('status',e)}><span className="d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.status</T></span> {renderToggleIcon(this.state.statusDir)} </Col>:''}
                        {(this.props.inactive)?<Col className="vertical-middle jail-status" md={1} onClick={(e) => this.toggleDir('jailed',e)}><span className="d-md-none d-lg-inline-block text-uppercase dark-color font-500"><T>validators.jailed</T></span> {renderToggleIcon(this.state.jailedDir)} </Col>:''}
                    </Row>
                    {(this.props.inactive)?<List
                        inactive={this.props.inactive}
                        monikerDir={this.state.monikerDir}
                        votingPowerDir={this.state.votingPowerDir}
                        uptimeDir={this.state.uptimeDir}
                        commissionDir={this.state.commissionDir}
                        selfDelDir={this.state.selfDelDir}
                        statusDir={this.state.statusDir}
                        jailedDir={this.state.jailedDir}
                        priority={this.state.priority}
                        status={this.props.status}
                    />:<List
                        monikerDir={this.state.monikerDir}
                        votingPowerDir={this.state.votingPowerDir}
                        uptimeDir={this.state.uptimeDir}
                        commissionDir={this.state.commissionDir}
                        selfDelDir={this.state.selfDelDir}
                        priority={this.state.priority}
                    />}
                </Col>
            </Row>
        </div>
    }

}
