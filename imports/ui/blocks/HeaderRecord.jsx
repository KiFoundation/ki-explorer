import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
class HeaderRecord extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Row className="header text-nowrap d-none d-sm-flex latest-block-page mb-3 mt-4" style={{ border: 0 }}>                
                <Col sm={2}><span className="d-none d-md-inline text-uppercase dark-color font-500 list-title"><T>common.hash</T></span></Col>
                <Col sm={2}><span className="d-none d-md-inline text-uppercase dark-color font-500 list-title"><T>common.height</T></span></Col>
                <Col sm={3} md={2} lg={3}><span className="d-none d-md-inline text-uppercase dark-color font-500 list-title"><T>blocks.proposer</T></span></Col>
                <Col sm={1} md={2}><span className="d-none d-md-inline text-uppercase dark-color font-500 list-title"><T>blocks.numOfTxs</T></span></Col>
                <Col sm={4} lg={3}><span className="d-none d-md-inline text-uppercase dark-color font-500 list-title"><T>common.time</T> (UTC)</span></Col>
            </Row>
        );
    }
}

export default HeaderRecord;