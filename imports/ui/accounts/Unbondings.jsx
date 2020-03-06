import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export default class AccountUnbondings extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let numUnbondings = this.props.unbonding.length;
        return (
            <Container fluid>
                <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{ border: 0 }}>
                    <Col md={5}><span className="text-uppercase dark-color font-500"><T>accounts.validators</T></span></Col>
                    <Col md={7}>
                        <Row>
                            <Col md={6}><span className="text-uppercase dark-color font-500"><T>accounts.shares</T></span></Col>
                            <Col md={6}><span className="text-uppercase dark-color font-500"><T>accounts.mature</T></span></Col>
                        </Row>
                    </Col>
                </Row>
                {this.props.unbonding.map((u, i) =>
                    <Row key={i} className="delegation-info bg-white my-2 py-3 list-border">
                        <Col md={5} className="text-nowrap overflow-auto font-500"><Account address={u.validator_address} /></Col>
                        <Col md={7}>{u.entries.map((entry,j) =>
                            <Row key={j}>
                                <Col md={6}>
                                    {numbro(entry.balance).format("0,0")}
                                </Col>
                                <Col md={6}>
                                    {moment.utc(entry.completion_time).fromNow()}
                                </Col>
                            </Row>
                        )}</Col>
                    </Row>
                )}
            </Container>
        );
    }
}