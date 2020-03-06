
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import classnames from 'classnames';
import numbro from 'numbro';
import { TransactionRow } from './TransactionRow.jsx';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class TransactionTabs extends Component{
    constructor(props){
        super(props);
        this.state ={
            activeTab: 'tx-transfer',
            transferTxs: {},
            stakingTxs: {},
            distributionTxs: {},
            governanceTxs: {},
            slashingTxs: {}
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidUpdate(prevProps){
        if (this.props != prevProps){
            this.setState({
                transferTxs: this.props.transferTxs,
                stakingTxs: this.props.stakingTxs,
                distributionTxs: this.props.distributionTxs,
                governanceTxs: this.props.governanceTxs,
                slashingTxs: this.props.slashingTxs
            })
        }
    }

    render(){
        return <div>
            {/* <CardHeader><T>transactions.transactions</T> <small>(<T>common.last</T> 100)</small></CardHeader> */}
            <div>
                <Nav pills className="tx-types filter-pills">
                    <NavItem>
                        <NavLink
                            style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                            className={classnames({ active: this.state.activeTab === 'tx-transfer' })}
                            onClick={() => { this.toggle('tx-transfer'); }}
                        >
                            <T>transactions.transfer</T> ({numbro(this.state.transferTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{borderRadius: 0}}
                            className={classnames({ active: this.state.activeTab === 'tx-staking' })}
                            onClick={() => { this.toggle('tx-staking'); }}
                        >
                            <T>transactions.staking</T> ({numbro(this.state.stakingTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{borderRadius: 0}}
                            className={classnames({ active: this.state.activeTab === 'tx-distr' })}
                            onClick={() => { this.toggle('tx-distr'); }}
                        >
                            <T>transactions.distribution</T> ({numbro(this.state.distributionTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{borderRadius: 0}}
                            className={classnames({ active: this.state.activeTab === 'tx-gov' })}
                            onClick={() => { this.toggle('tx-gov'); }}
                        >
                            <T>transactions.governance</T> ({numbro(this.state.governanceTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                            className={classnames({ active: this.state.activeTab === 'tx-slashing' })}
                            onClick={() => { this.toggle('tx-slashing'); }}
                        >
                            <T>transactions.slashing</T> ({numbro(this.state.slashingTxs.length).format("0,0")})
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="tx-transfer">
                        { this.state.transferTxs.length > 0 && <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                            <Col md={2}><span className="dark-color font-500 text-uppercase"><T>common.hash</T></span></Col>
                            <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.type</T></span></Col>
                            <Col md={2}><span className="dark-color font-500 text-uppercase"><T>validators.amount</T></span></Col>
                            <Col md={1}><span className="dark-color font-500 text-uppercase"><T>transactions.valid</T></span></Col>
                            <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.fee</T></span></Col>
                            </Row> }
                        <Row>
                            <Col>
                                {(this.state.transferTxs.length > 0)?this.state.transferTxs.map((tx, i) => {
                                    return <TransactionRow
                                        key={i}
                                        index={i}
                                        tx={tx}
                                        blockList
                                    />
                                }):''}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="tx-staking">
                        { this.state.stakingTxs.length > 0 && <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>common.hash</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.type</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>validators.amount</T></span></Col>
                        <Col md={1}><span className="dark-color font-500 text-uppercase"><T>transactions.valid</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.fee</T></span></Col>
                        </Row> }
                        <Row>
                            <Col>
                                {(this.state.stakingTxs.length > 0)?this.state.stakingTxs.map((tx, i) => {
                                    return <TransactionRow
                                        key={i}
                                        index={i}
                                        tx={tx}
                                        blockList
                                    />
                                }):''}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="tx-distr">
                        { this.state.distributionTxs.length > 0 && <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>common.hash</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.type</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>validators.amount</T></span></Col>
                        <Col md={1}><span className="dark-color font-500 text-uppercase"><T>transactions.valid</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.fee</T></span></Col>
                        </Row> }
                        <Row>
                            <Col>
                                {(this.state.distributionTxs.length > 0)?this.state.distributionTxs.map((tx, i) => {
                                    return <TransactionRow
                                        key={i}
                                        index={i}
                                        tx={tx}
                                        blockList
                                    />
                                }):''}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="tx-gov">
                        { this.state.governanceTxs.length > 0 && <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>common.hash</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.type</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>validators.amount</T></span></Col>
                        <Col md={1}><span className="dark-color font-500 text-uppercase"><T>transactions.valid</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.fee</T></span></Col>
                        </Row> }
                        <Row>
                            <Col>
                                {(this.state.governanceTxs.length > 0)?this.state.governanceTxs.map((tx, i) => {
                                    return <TransactionRow
                                        key={i}
                                        index={i}
                                        tx={tx}
                                        blockList
                                    />
                                }):''}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="tx-slashing">
                        { this.state.slashingTxs.length > 0 && <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>common.hash</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.type</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>validators.amount</T></span></Col>
                        <Col md={1}><span className="dark-color font-500 text-uppercase"><T>transactions.valid</T></span></Col>
                        <Col md={2}><span className="dark-color font-500 text-uppercase"><T>transactions.fee</T></span></Col>
                        </Row> }
                        <Row>
                            <Col>
                                {(this.state.slashingTxs.length > 0)?this.state.slashingTxs.map((tx, i) => {
                                    return <TransactionRow
                                        key={i}
                                        index={i}
                                        tx={tx}
                                        blockList
                                    />
                                }):''}
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    }
}
