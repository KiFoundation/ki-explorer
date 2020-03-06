import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Row, Col } from 'reactstrap';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js';

const T = i18n.createComponent();

export default class ChainStatesBlocks extends Component{
    constructor(props){
        super(props);

        if (Meteor.isServer){
            let data = {}
            if (this.props.chainStates) {
                data.height = this.props?.chainStates?.height || null;
                // data.bondedTokens = this.props?.chainStates?.bondedTokens || null;
                data.bondedTokens = this.props?.chainStates?.bondedTokens || null;
                data.price = 0.035;
            }
            if (this.props.chainStates.communityPool){
                data.communityPool = this.props.chainStates.communityPool.map((pool,i) => {
                    return <span key={i}>{new Coin(pool.amount).stakeString('0,0.00')}</span>
                })
                data.inflation = numbro(this.props.chainStates.inflation).format("0.00%")
            }

            if (this.props.coinStats.usd){
                // data.price = this.props.coinStats.usd,
                data.marketCap = numbro(this.props.coinStats.usd_market_cap).format("$0,0.00")
            }
            this.state = data;
        }
        else{
            this.state = {
                price: "0.035",
                marketCap: "-",
                inflation: 0,
                communityPool: 0,
                height: 0,
                bondedTokens: 0
            }
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.chainStates != prevProps.chainStates){
            if (this.props.chainStates.height !== prevProps.chainStates.height) {
                this.setState({ height: this.props.chainStates.height });
            }
            if (this.props.chainStates.bondedTokens !== prevProps.chainStates.bondedTokens) {
                // this.setState({ bondedTokens: this.props.chainStates.bondedTokens });
                this.setState({
                    totalSupply: this.props.chainStates.totalSupply,
                    bondedTokens: numbro(this.props.chainStates.bondedTokens/this.props.chainStates.totalSupply).format("0.00%")
                });
            }
            if (this.props.chainStates.communityPool){
                this.setState({
                    communityPool: this.props.chainStates.communityPool.map((pool,i) => {
                        return <span key={i}>{new Coin(pool.amount).stakeString('0,0.00')}</span>
                    }),
                    inflation: numbro(this.props.chainStates.inflation).format("0.00%")
                })
            }
        }
        if (this.props.coinStats != prevProps.coinStats){
            if (this.props.coinStats.usd){
                this.setState({
                    // price: this.props.coinStats.usd,
                    marketCap: numbro(this.props.coinStats.usd_market_cap).format("$0,0.00")
                })
            }
        }
    }
    render(){
        return (
            <Row>
                <Col>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={4} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                        <span className="vertical-align" style={{fontSize: 13}}><T>chainStates.price</T><span className="rounded-icon ml-1" style={{ height: 17, width: 17 }}><i class="fas fa-question" style={{fontSize: 8}}></i></span></span>
                                        </b>
                                    </small>
                                    <h3 className="mt-3 dark-color d-block font-weight-bold">
                                        ${this.state.price}
                                    </h3>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                </Col>
                <Col>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={4} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                        <span className="vertical-align" style={{fontSize: 13}}><T>chainStates.height</T><span className="rounded-icon ml-1" style={{ height: 17, width: 17 }}><i class="fas fa-question" style={{fontSize: 8}}></i></span></span>
                                        </b>
                                    </small>
                                    <h3 className="mt-3 dark-color d-block font-weight-bold">
                                        {this.state.height}
                                    </h3>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                </Col>
                <Col>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={4} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                        <span className="vertical-align" style={{fontSize: 13}}><T>chainStates.bondedTokens</T><span className="rounded-icon ml-1" style={{ height: 17, width: 17 }}><i class="fas fa-question" style={{fontSize: 8}}></i></span></span>
                                        </b>
                                    </small>
                                    <h3 className="mt-3 dark-color d-block font-weight-bold">
                                        {this.state.bondedTokens}
                                        {/* {numbro(this.state?.bondedTokens/this.props?.chainStates?.totalSupply).format("0.00%")} */}
                                    </h3>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                </Col>
                <Col>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={4} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                        <span className="vertical-align" style={{fontSize: 13}}><T>chainStates.inflation</T><span className="rounded-icon ml-1" style={{ height: 17, width: 17 }}><i class="fas fa-question" style={{fontSize: 8}}></i></span></span>
                                        </b>
                                    </small>
                                    <h3 className="mt-3 dark-color d-block font-weight-bold">
                                        {this.state.inflation}
                                    </h3>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
        );
    }
}
