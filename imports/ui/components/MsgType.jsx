import React from 'react';
import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export const MsgType = (props) => {
    switch (props.type){
    // bank
    case "/cosmos.bank.v1beta1.MsgSend":
        return <Badge color="success"><T>messageTypes.send</T></Badge>
    case "/cosmos.bank.v1beta1.MsgMultiSend":
        return <span><Badge color="success"><T>messageTypes.multiSend</T></Badge>
              <Badge color="success">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>

    // staking
    case "/cosmos.staking.v1beta1.MsgCreateValidator":
        return <Badge color="warning"><T>messageTypes.createValidator</T></Badge>;
    case "/cosmos.staking.v1beta1.MsgEditValidator":
        return <Badge color="warning"><T>messageTypes.editValidator</T></Badge>;
    case "/cosmos.staking.v1beta1.MsgDelegate":
        return <Badge color="warning"><T>messageTypes.delegate</T></Badge>;
    case "/cosmos.staking.v1beta1.MsgUndelegate":
        return <Badge color="warning"><T>messageTypes.undelegate</T></Badge>;
    case "/cosmos.staking.v1beta1.MsgBeginRedelegate":
        return <Badge color="warning"><T>messageTypes.redelegate</T></Badge>;

    // gov
    case "/cosmos.gov.v1beta1.MsgSubmitProposal":
        return <Badge color="info"><T>messageTypes.submitProposal</T></Badge>
    case "/cosmos.gov.v1beta1.MsgDeposit":
        return <Badge color="info"><T>messageTypes.deposit</T></Badge>
    case "/cosmos.gov.v1beta1.MsgVote":
        return <Badge color="info"><T>messageTypes.vote</T></Badge>;

    // distribution
    case "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":
        return <span><Badge color="secondary"><T>messageTypes.withdrawComission</T></Badge><Badge color="secondary">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":
        return <span><Badge color="secondary"><T>messageTypes.withdrawReward</T></Badge><Badge color="secondary">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/cosmos.distribution.v1beta1.MsgModifyWithdrawAddress":
        return <span><Badge color="secondary"><T>messageTypes.modifyWithdrawAddress</T></Badge><Badge color="secondary">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;

    // slashing
    case "/cosmos.slashing.v1beta1.MsgUnjail":
        return <Badge color="danger"><T>messageTypes.unjail</T></Badge>;

    // ibc
    case "/cosmos.IBCTransferMsg":
        return <span><Badge color="light"><T>messageTypes.IBCTransfer</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/cosmos.IBCReceiveMsg":
        return <span><Badge color="light"><T>messageTypes.IBCReceive</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;

    case "/ibc.core.client.v1.MsgCreateClient":
        return <span><Badge color="light"><T>messageTypes.IBCCreateClient</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.client.v1.MsgUpdateClient":
        return <span><Badge color="light"><T>messageTypes.IBCUpdateClient</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.client.v1.MsgUpgradeClient":
        return <span><Badge color="light"><T>messageTypes.IBCUpgradeClient</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.client.v1.MsgSubmitMisbehaviour":
        return <span><Badge color="light"><T>messageTypes.IBCSubmitMisbehaviour</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.client.v1.Height":
        return <span><Badge color="light"><T>messageTypes.IBCHeight</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;

    case "/ibc.core.channel.v1.MsgRecvPacket":
        return <span><Badge color="light"><T>messageTypes.IBCReceivePacket</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.Channel":
        return <span><Badge color="light"><T>messageTypes.IBCChannel</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.Counterparty":
        return <span><Badge color="light"><T>messageTypes.IBCCounterparty</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.Packet":
        return <span><Badge color="light"><T>messageTypes.IBCPacket</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgAcknowledgement":
        return <span><Badge color="light"><T>messageTypes.IBCAcknowledgement</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelCloseConfirm":
        return <span><Badge color="light"><T>messageTypes.IBCChannelCloseConfirm</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelCloseInit":
        return <span><Badge color="light"><T>messageTypes.IBCChannelCloseInit</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelOpenAck":
        return <span><Badge color="light"><T>messageTypes.IBCChannelOpenAck</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelOpenConfirm":
        return <span><Badge color="light"><T>messageTypes.IBCChannelOpenConfirm</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelOpenInit":
        return <span><Badge color="light"><T>messageTypes.IBCChannelOpenInit</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgChannelOpenTry":
        return <span><Badge color="light"><T>messageTypes.IBCChannelOpenTry</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgTimeout":
        return <span><Badge color="light"><T>messageTypes.IBCTimeout</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.channel.v1.MsgTimeoutOnClose":
        return <span><Badge color="light"><T>messageTypes.IBCTimeoutOnClose</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;

    case "/ibc.core.connection.v1.MsgConnectionOpenAck":
        return <span><Badge color="light"><T>messageTypes.IBCConnectionOpenAck</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.MsgConnectionOpenConfirm":
        return <span><Badge color="light"><T>messageTypes.IBCConnectionOpenConfirm</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.MsgConnectionOpenInit":
        return <span><Badge color="light"><T>messageTypes.IBCConnectionOpenInit</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.MsgConnectionOpenTry":
        return <span><Badge color="light"><T>messageTypes.IBCConnectionOpenTry</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.ConnectionEnd":
        return <span><Badge color="light"><T>messageTypes.IBCConnectionEnd</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.Counterparty":
        return <span><Badge color="light"><T>messageTypes.IBCCounterparty</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;
    case "/ibc.core.connection.v1.Version":
        return <span><Badge color="light"><T>messageTypes.IBCVersion</T></Badge><Badge color="light">{(props.num >1)? "+" + (props.num-1):''}</Badge></span>;

    case "/ibc.applications.transfer.v1.MsgTransfer":
        return <span className="mr-1"><Badge color="light"><T>messageTypes.IBCMsgTransfer</T></Badge></span>;

    default:
        return <Badge color="primary">{props.type}</Badge>;
    }
}
