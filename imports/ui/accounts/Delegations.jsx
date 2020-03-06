import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import AccountTooltip from '../components/AccountTooltip.jsx';
import { Mongo } from 'meteor/mongo';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js'

const T = i18n.createComponent();

export default class AccountDelegations extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container fluid>
                <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}}>
                    <Col xs={6} md={4}><span className="text-uppercase dark-color font-500"><T>accounts.validators</T></span></Col>
                    <Col xs={3} md={4}><span className="text-uppercase dark-color font-500"><T>accounts.shares</T></span></Col>
                    <Col xs={3} md={4}><span className="text-uppercase dark-color font-500"><T>{Coin.StakingDenomPlural}</T></span></Col>
                </Row>
                {this.props.delegations.sort((b, a) => (a.balance - b.balance)).map((d, i) => {
                    return <Row key={i} className="delegation-info bg-white my-2 py-3 list-border">
                        <Col xs={6} md={4} className="text-nowrap overflow-auto primary-color font-800"><AccountTooltip address={d.validator_address} /></Col>
                        <Col xs={3} md={4}>{numbro(d.shares).format("0,0")}</Col>
                        <Col xs={3} md={4}>{new Coin(d.balance).stakeString()}</Col>
                    </Row>
                })}
            </Container>
        );
    }
}