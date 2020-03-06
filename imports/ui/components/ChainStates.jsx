import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Row, Col } from 'reactstrap';
import numbro from 'numbro';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js';

const T = i18n.createComponent();

export default class ChainStates extends Component{
    constructor(props){
        super(props);

        if (Meteor.isServer){
            let data = {}
            if (this.props.chainStates) {
                data.height = this.props?.chainStates?.height || null;
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
                this.setState({ bondedTokens: numbro(this.props.chainStates.bondedTokens/this.props.chainStates.totalSupply).format("0.00%") })
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
        return <Card className="d-lg-inline-block" style={{boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'}}>
            <CardHeader className="bg-white">
                <Row className="text-nowrap chain-states-wrapper dark-color">
                    {/* Check une autre classe d'icons */}
                    <Col xs={4} md="auto"><span><small className="vertical-align"><span className="rounded-icon"><i className="fas fa-dollar-sign"></i></span><b><T>chainStates.price</T>:</b> <span className="ml-2">${this.state.price}</span></small></span></Col>
                    <Col xs={4} md="auto"><span><small className="vertical-align"><span className="rounded-icon"><i className="material-icons">height</i></span><b><T>chainStates.height</T>:</b> <span className="ml-2">{this.state.height}</span></small></span></Col>
                    <Col xs={4} md="auto"><span><small className="vertical-align"><span className="rounded-icon"><i class="fas fa-chart-pie"></i></span><b><T>chainStates.bondedTokens</T>:</b> <span className="ml-2">{this.state.bondedTokens}</span></small></span></Col>
                    <Col xs={4} md="auto"><span><small className="vertical-align"><span className="rounded-icon"><i className="material-icons">trending_up</i></span><b><T>chainStates.inflation</T>:</b> <span className="ml-2">{this.state.inflation}</span></small></span></Col>
                    {/* <Col xs={8} md="auto"><small><span><T>chainStates.marketCap</T>:</span> <strong>{this.state.marketCap}</strong></small></Col> */}
                    {/* <Col xs={8} md="auto"><small><span><T>chainStates.communityPool</T>:</span> <strong>{this.state.communityPool}</strong></small></Col> */}
                </Row>
            </CardHeader>
        </Card>
    }
}
