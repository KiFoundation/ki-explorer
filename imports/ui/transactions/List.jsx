import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
// import Activities from '../components/Activities.jsx';
import CosmosErrors from '../components/CosmosErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
import { TransactionRow } from './TransactionRow.jsx';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class Transactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            txs: ""
        }
    }

    componentDidUpdate(prevProps){
        if (this.props != prevProps){
            if (this.props.transactions.length > 0){
                this.setState({
                    txs: this.props.transactions.map((tx, i) => {
                        return <TransactionRow
                            key={i}
                            index={i}
                            tx={tx}
                            history={this.props.history}
                        />
                    })
                })
            }
        }
    }

    render(){
        if (this.props.loading){
            return <Spinner type="grow" color="primary" />
        }
        else if (!this.props.transactionsExist){
            return <div><T>transactions.notFound</T></div>
        }
        else{
            return <div className="transactions-list mt-4 pt-1">
                <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4 text-left" style={{border: 0}}>
                <Col xs={3} lg={1}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>transactions.txHash</T></span></Col>
                <Col xs={5} md={3} lg={2}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>transactions.type</T></span></Col>
                <Col xs={5} md={3} lg={2}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>transactions.amount</T></span></Col>
                <Col xs={4} md={2} lg={1}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>common.height</T></span></Col>
                <Col xs={2} md={1} className="text-nowrap"><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>transactions.valid</T></span></Col>
                <Col xs={12} lg={2}><span className="d-inline-block d-md-none d-lg-inline-block text-uppercase dark-color font-500 list-title"><T>transactions.fee</T></span></Col>
                </Row>
                {this.state.txs}
            </div>
        }
    }
}
