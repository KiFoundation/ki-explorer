import React, { Component } from 'react';
import { Badge, Row, Col, Container } from 'reactstrap';
import Blocks from '/imports/ui/blocks/BlocksTable.jsx';
import HeaderRecord from '/imports/ui/blocks/HeaderRecord.jsx';
import ChainStatus from './ChainStatusContainer.js';
import Consensus from './ConsensusContainer.js';
import TopValidators from './TopValidatorsContainer.js';
import Chart from './ChartContainer.js';
import ChainStates from '../components/ChainStatesContainer.js';
import ChainStatesBlocks from '../components/ChainStatesBlocksContainer';
import { Helmet } from "react-helmet";
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <div id="home">
            <Helmet>
                <title>KiChain Block Explorer</title>
                <meta name="description" content="Cosmos is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms like Tendermint consensus." />
            </Helmet>
            <ChainStatesBlocks />
            {/* <Switch>
                <Route path="/blocks/:blockId" render={(props)=> <Sidebar
                    sidebar={<Block {...props} />}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: {
                        background: "white",
                        position: "fixed",
                        width: '85%',
                        zIndex: 4
                    }, overlay:{
                        zIndex: 3
                    } }}
                >
                </Sidebar>} />
            </Switch> */}
            <Container fluid id="block-table" className="mt-4 pt-1 px-0">
                <Blocks history={this.props.history} showChainStates={false} title={<T>blocks.blocks</T>} limit={10} />
            </Container>
            {/* <Row>
                <Col md={3} xs={12}><h1 className="dark-color">{Meteor.settings.public.chainName}</h1></Col>
                <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col>
            </Row> */}
            {/* <Consensus /> */}
            {/* <Row>
                <Col md={6}>
                    <TopValidators />
                </Col>
                <Col md={6}>
                    <Chart />
                </Col>
            </Row> */}
        </div>
    }

}
