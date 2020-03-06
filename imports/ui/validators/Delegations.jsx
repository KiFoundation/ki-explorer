import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import { Mongo } from 'meteor/mongo';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js'

const T = i18n.createComponent();

export default class ValidatorDelegations extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            numDelegatiors: 0,
            delegations: ''
        }
    }

    componentDidMount(){
        Meteor.call('Validators.getAllDelegations', this.props.address, (error, result) => {
            if (error){
                console.warn(error);
            }

            if (result){
                // console.log(result);
                // Delegations.remove({});
                let Delegations = new Mongo.Collection(null);
                result.forEach((delegation,i) => {
                    Delegations.insert(delegation);
                })
                let delegations = Delegations.find({},{sort:{shares:-1}}).fetch();
                this.setState({
                    loading: false,
                    numDelegatiors:delegations.length,
                    delegations: delegations.map((d, i) => {
                        return <Row key={i} className="delegation-info block-info bg-white my-2 py-3 list-border">
                            <Col md={8} className="text-nowrap overflow-auto"><Account linkStyle={{color: '#043bea'}} address={d.delegator_address} /></Col>
                            <Col md={4}>{new Coin(d.shares/this.props.shares*this.props.tokens).toString(2)}s</Col>
                        </Row>
                    })
                })
            }
        })
    }

    render(){
        if (this.state.loading){
            return <div><Spinner type="grow" color="primary"/></div>
        }
        else{
            // return <Card>
                // {/* <CardHeader>{(this.state.numDelegatiors > 0)?this.state.numDelegatiors:'No'} <T>common.delegators</T> {(this.state.numDelegatiors > 0)?<small className="text-secondary">({new Coin(this.props.tokens/this.state.numDelegatiors).toString(2)}s / delegator)</small>:''}</CardHeader> */}
                // <CardBody className="list">
                    return (<Container fluid>
                        <Row className="header text-nowrap d-none d-lg-flex mb-3 mt-4" style={{border: 0}} >
                            <Col md={8}><span className="dark-color font-500 text-uppercase"><T>validators.delegator</T></span></Col>
                            <Col md={4}><span className="dark-color font-500 text-uppercase"><T>common.amounts</T></span></Col>
                        </Row>
                        {this.state.delegations}
                    </Container>);
                // </CardBody>
            // </Card>
        }
    }
}