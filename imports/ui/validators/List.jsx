import React, { Component } from 'react';
import { Badge, Progress, Row, Col, Card, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import numbro from 'numbro';
import Avatar from '../components/Avatar.jsx';
import TimeStamp from '../components/TimeStamp.jsx';
import SentryBoundary from '../components/SentryBoundary.jsx';


const ValidatorRow = (props) => {
    let moniker = (props.validator.description&&props.validator.description.moniker)?props.validator.description.moniker:props.validator.address;
    return (
        <SentryBoundary>
            <Row className="validator-info bg-white my-2 py-3 list-border block-info block-info-custom cursor-pointer align-items-center"  onClick={() => props.history?.push("/validator/"+props.validator.operator_address)}>
                <Col className="d-none d-md-block counter data" md={1}>{props.index+1}</Col>
                <Col xs={6} md={2} className="data"><Link to={"/validator/"+props.validator.operator_address}><Avatar moniker={moniker} profileUrl={props.validator.profile_url} address={props.validator.address} list={true} /><span className="moniker font-800 primary-color">{moniker}</span></Link></Col>
                <Col className="voting-power data text-left" xs={{size:6, offset:0}} md={{size:3, offset:0}} lg={2}><i className="material-icons d-md-none">power</i>  <span><span className="d-none d-lg-block">{props.validator.voting_power?numbro(props.validator.voting_power).format('0,0'):0}</span> ({props.validator.voting_power?numbro(props.validator.voting_power/props.totalPower).format('0.00%'):"0.00%"})</span></Col>
                <Col className="self-delegation data" xs={{size:6, offset:0}} md={{size:2, offset:0}}><i className="material-icons d-md-none">equalizer</i> <span>{props.validator.self_delegation?numbro(props.validator.self_delegation).format('0.00%'):'N/A'}</span></Col>
                
                {(!props.inactive)?<Col className="commission data" xs={{size:6}} md={{size: 2, offset: 0}}><i className="material-icons d-md-none">call_split</i> <span>{props.validator.commission.commission_rates?numbro(props.validator.commission.commission_rates.rate).format('0.00%'):''}</span></Col>:''}
                {(!props.inactive)?<Col className="uptime data" xs={{size:6}} md={1}><i className="material-icons d-md-none">network_check</i> <span>{props.validator.uptime?props.validator.uptime.toFixed(2):0}%</span></Col>:''}

                {(props.inactive)?<Col className="last-seen d-none d-lg-inline-block data" xs={{size:10,offset:2}} md={{size:2, offset:0}}>{props.validator.lastSeen?<TimeStamp time={props.validator.lastSeen}/>:''}</Col>:''}
                {(props.inactive)?<Col className="bond-status data" xs={2} md={2}>{(props.validator.status == 0)?<Badge color="secondary"><span>U<span className="d-none d-md-inline">nbonded</span></span></Badge>:<Badge color="warning"><span>U<span className="d-none d-md-inline">nbonding</span></span></Badge>}</Col>:''}
                {(props.inactive)?<Col className="jail-status data" xs={2} md={1}>{props.validator.jailed?<Badge color="danger"><span>J<span className="d-none d-md-inline">ailed</span></span></Badge>:''}</Col>:''}
            </Row>
        </SentryBoundary>
    );
}

export default class List extends Component{
    constructor(props){
        super(props);

        if (Meteor.isServer){
            if (this.props.validators.length > 0 && this.props.chainStatus){
                this.state = {
                    validators: this.props.validators.map((validator, i) => {
                        return <ValidatorRow
                            history={this.props.history}
                            key={validator.address}
                            index={i}
                            validator={validator}
                            address={validator.address}
                            totalPower={this.props.chainStatus.activeVotingPower}
                            inactive={this.props.inactive}
                        />
                    })
                }
            }
        }
        else{
            this.state = {
                validators: ""
            }
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.validators != prevProps.validators){
            if (this.props.validators.length > 0 && this.props.chainStatus){
                this.setState({
                    validators: this.props.validators.map((validator, i) => {
                        return <ValidatorRow
                            history={this.props.history}
                            key={validator.address}
                            index={i}
                            validator={validator}
                            address={validator.address}
                            totalPower={this.props.chainStatus.activeVotingPower}
                            inactive={this.props.inactive}
                        />
                    })
                })
            }
            else{
                this.setState({
                    validators: ""
                })
            }
        }
    }

    render(){
        if (this.props.loading){
            return <Spinner type="grow" color="primary" />
        }
        else{
            return (
                this.state.validators
            )
        }
    }
}
