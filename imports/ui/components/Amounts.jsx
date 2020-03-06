import React, {Component } from 'react';
import { MsgType } from './MsgType.jsx';
import { Link } from 'react-router-dom';
import numbro from 'numbro';
import Account from '../components/Account.jsx';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js'
import _ from 'lodash';

const T = i18n.createComponent();

MultiTx = (props) => {
  console.log(props.hash);
    return <div>
        <Link className="primary-color" to={"/transactions/"+props.hash}><T>common.more-s</T></Link>
    </div>
}

export default class Amounts extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let msg = this.props.msg;
        let hash = this.props.hash;

        switch (msg.type){
        // bank
        case "cosmos-sdk/MsgSend":
            let amount = '';
            amount = msg.value.amount.map((coin) => new Coin(coin.amount).toString()).join(', ')
            return <span className="fee">{amount}</span>
        case "cosmos-sdk/MsgMultiSend":
            return <MultiTx  hash={hash} msg={msg}/>

            // staking
        case "cosmos-sdk/MsgDelegate":
            return <span className="fee">{new Coin(msg.value.amount.amount).toString()}</span>
        case "cosmos-sdk/MsgUndelegate":
            return <span className="fee">{new Coin(msg.value.amount.amount).toString()}</span>
        case "cosmos-sdk/MsgBeginRedelegate":
            return <span className="fee">{new Coin(msg.value.amount.amount).toString()}</span>

            // gov
        case "cosmos-sdk/MsgDeposit":
            return  <span className="fee">{msg.value.amount.map((amount,i) =>new Coin(amount.amount).toString()).join(', ')}</span>

/*        // distribution
        case "cosmos-sdk/MsgWithdrawValidatorCommission":
            return <MultiTx msg={msg}/>
        case "cosmos-sdk/MsgWithdrawDelegationReward":
            return <MultiTx msg={msg}/>

        default:
            return <div>{JSON.stringify(msg.value)}</div>
*/

        default:
          return <MultiTx hash={hash} msg={msg}/>

        }
    }
}
