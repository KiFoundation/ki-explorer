import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, CardHeader, Row, Col, Tooltip } from 'reactstrap';
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
            this.togglePrice = this.togglePrice.bind(this)
            this.toggleHeight = this.toggleHeight.bind(this)
            this.toggleBonded = this.toggleBonded.bind(this)
            this.toggleInflation = this.toggleInflation.bind(this)

            this.state = {
                price: "0.035",
                marketCap: "-",
                inflation: 0,
                communityPool: 0,
                height: 0,
                bondedTokens: 0,
                tooltipPriceOpen: false,
                tooltipHeightOpen: false,
                tooltipBondedOpen: false,
                tooltipInflationOpen: false
            }
        }
    }

    togglePrice = () => Meteor.isClient && this.setState({tooltipPriceOpen: !this.state.tooltipPriceOpen})
    toggleHeight = () => Meteor.isClient && this.setState({tooltipHeightOpen: !this.state.tooltipHeightOpen})
    toggleBonded = () => Meteor.isClient && this.setState({tooltipBondedOpen: !this.state.tooltipBondedOpen})
    toggleInflation = () => Meteor.isClient && this.setState({tooltipInflationOpen: !this.state.tooltipInflationOpen})

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
                <Col className="pr-0" xs={6} lg={3}>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={12} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                            <span className="vertical-align justify-content-start" style={{fontSize: 13}}>
                                                <T>chainStates.price</T>
                                                <span className="rounded-icon ml-1" id="tooltip-price" style={{ height: 17, width: 17 }}>
                                                    <i class="fas fa-question" style={{fontSize: 8}} />
                                                </span>
                                                <Tooltip placement="top" isOpen={this.state.tooltipPriceOpen} autohide={false} target="tooltip-price" toggle={this.togglePrice}>
                                                    <T>chainStates.tooltipPrice</T>
                                                </Tooltip>
                                            </span>
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
                <Col className="pr-lg-0" xs={6} lg={3}>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={12} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                            <span className="vertical-align justify-content-start" style={{fontSize: 13}}>
                                                <T>chainStates.height</T>
                                                <span className="rounded-icon ml-1" id="tooltip-height" style={{ height: 17, width: 17 }}>
                                                    <i class="fas fa-question" style={{fontSize: 8}}></i>
                                                </span>
                                                <Tooltip placement="top" isOpen={this.state.tooltipHeightOpen} autohide={false} target="tooltip-height" toggle={this.toggleHeight}>
                                                    <T>chainStates.tooltipHeight</T>
                                                </Tooltip>
                                            </span>
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
                <Col className="pr-0" xs={6} lg={3}>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={12} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                            <span className="vertical-align justify-content-start" style={{fontSize: 13}}>
                                                <T>chainStates.bondedTokens</T>
                                                <span className="rounded-icon ml-1" id="tooltip-bonded" style={{ height: 17, width: 17 }}>
                                                    <i class="fas fa-question" style={{fontSize: 8}} />
                                                </span>
                                                <Tooltip placement="top" isOpen={this.state.tooltipBondedOpen} autohide={false} target="tooltip-bonded" toggle={this.toggleBonded}>
                                                    <T>chainStates.tooltipBonded</T>
                                                </Tooltip>
                                            </span>
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
                <Col xs={6} lg={3}>
                    <Card className="d-lg-inline-block w-100 bg-white card-header-custom">
                        <CardHeader className="bg-white list-border">
                            <Row className="text-nowrap chain-states-wrapper dark-color">
                                <Col xs={12} md="auto">
                                    <small className="text-uppercase light-color">
                                        <b>
                                            <span className="vertical-align justify-content-start"  style={{fontSize: 13}}>
                                                <T>chainStates.inflation</T>
                                                <span className="rounded-icon ml-1" id="tooltip-inflation" style={{ height: 17, width: 17 }}>
                                                    <i class="fas fa-question" style={{fontSize: 8}} />
                                                </span>
                                                <Tooltip placement="top" isOpen={this.state.tooltipInflationOpen} autohide={false} target="tooltip-inflation" toggle={this.toggleInflation}>
                                                    <T>chainStates.tooltipInflation</T>
                                                </Tooltip>
                                            </span>
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
