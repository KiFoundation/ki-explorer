
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
// import Activities from '../components/Activities.jsx';
import Amounts from '../components/Amounts.jsx';
import CosmosErrors from '../components/CosmosErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
import Coin from '/both/utils/coins.js'
import SentryBoundary from '../components/SentryBoundary.jsx';
import i18n from 'meteor/universe:i18n';

import { MsgType } from '../components/MsgType.jsx';

export const TransactionRow = (props) => {
    let tx = props.tx;
    // console.log(tx);
    return <SentryBoundary><Row className={(tx.code)?"tx-info invalid":"tx-info" + " bg-white my-2 py-3 mx-1 list-border vertical-middle"}>
    <Col xs={(!props.blockList)?{size:6}:{size:12}} md={(!props.blockList)?{size:3}:{size:7}} lg={(!props.blockList)?{size:1}:{size:2}} className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link className="primary-color font-800" to={"/transactions/"+tx.txhash}>{tx.txhash}</Link></Col>

    {<Col xs={5} md={3} lg={2} className="text-nowrap">{(tx.tx.value.msg && tx.tx.value.msg.length >0)?[tx.tx.value.msg[0]].map((msg,i) => {
      return <MsgType type={msg.type} num={tx.tx.value.msg.length}/> 
      }):''}</Col> }

      {<Col xs={5} md={3} lg={2} className="text-nowrap">{(tx.tx.value.msg && tx.tx.value.msg.length >0)?[tx.tx.value.msg[0]].map(msg => {
        // console.log(tx.txhash)
      return <Amounts msg={msg} hash={tx.txhash} invalid={(!!tx.code)}/>
      }):''}</Col>}

        {(!props.blockList)?<Col xs={6} md={9} lg={{size:2,order:"last"}} className="text-nowrap"><span className="vertical-middle primary-color"><i className="material-icons mr-2">schedule</i> {tx.block()?<TimeAgo time={tx.block().time} />:''}</span></Col>:''}
        {(!props.blockList)?<Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i> <Link className="primary-color font-800" to={"/blocks/"+tx.height}>{numbro(tx.height).format("0,0")}</Link></Col>:''}
        <Col xs={(!props.blockList)?2:4} md={1}>{(!tx.code)?<TxIcon valid />:<TxIcon />}</Col>
        <Col xs={(!props.blockList)?6:8} md={(!props.blockList)?9:4} lg={2} className="fee"><i className="material-icons d-lg-none">monetization_on</i> {(tx.tx.value.fee.amount.length > 0)?tx.tx.value.fee.amount.map((fee,i) => {
            return <span className="text-nowrap" key={i}>{new Coin(fee.amount).toString()}</span>
        }):<span>No fee</span>}</Col>
        {(tx.code)?<Col xs={{size:12, order:"last"}} className="error">
            <Alert color="danger">
                <CosmosErrors
                    code={tx.code}
                    logs={tx.logs}
                    gasWanted={tx.gas_wanted}
                    gasUses={tx.gas_used}
                />
            </Alert>
        </Col>:''}
    </Row></SentryBoundary>
}
