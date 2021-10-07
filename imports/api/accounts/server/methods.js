import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Validators } from '/imports/api/validators/validators.js';
const fetchFromUrl = (url) => {
    try{
        let res = HTTP.get(API + url);
        if (res.statusCode == 200){
            return res
        };
    }
    catch (e){
        console.log(url);
        console.log(e);
    }
}

Meteor.methods({
    'accounts.getAccountDetail': function(address){
        this.unblock();
        let url = API + '/cosmos/auth/v1beta1/accounts/'+ address;
       	console.log(url)
	    try{
		let available = HTTP.get(url);
             console.log(available)
		    if (available.statusCode == 200){
                return JSON.parse(available.content).account
                // let response = JSON.parse(available.content).result;
                // let account;
                // if (response.type === 'cosmos-sdk/Account')
                //     account = response.value;
                // else if (response.type === 'cosmos-sdk/DelayedVestingAccount' || response.type === 'cosmos-sdk/ContinuousVestingAccount')
                //     account = response.value.BaseVestingAccount.BaseAccount
                // if (account && account.account_number != null)
                //     return account
                // return null
            }
        }
        catch (e){
            console.log(url);
            console.log(e)
        }
    },
    'accounts.getBalance': function(address){
        this.unblock();
        let balance = {}

        // get available atoms
        let url = API + '/cosmos/bank/v1beta1/balances/'+ address;
	   try{
            let available = HTTP.get(url);
	    console.log(available)
	    if (available.statusCode == 200){
                balance.available = JSON.parse(available.content).balances;

            }
        }
        catch (e){
            console.log(url);
            console.log(e)
        }

        // get delegated amnounts
        url = API + '/cosmos/staking/v1beta1/delegations/'+address;
        try{
            let delegations = HTTP.get(url);
            if (delegations.statusCode == 200){
                balance.delegations = JSON.parse(delegations.content).delegation_responses;
            }
        }
        catch (e){
            console.log(url);
            console.log(e);
        }
        // get unbonding
        url = API + '/cosmos/staking/v1beta1/delegators/'+address+'/unbonding_delegations';
        try{
            let unbonding = HTTP.get(url);
            if (unbonding.statusCode == 200){
                balance.unbonding = JSON.parse(unbonding.content).unbonding_responses;
            }
        }
        catch (e){
            console.log(url);
            console.log(e);
        }

        // get rewards
        url = API + '/cosmos/distribution/v1beta1/delegators/'+address+'/rewards';
        try{
            let rewards = HTTP.get(url);
            if (rewards.statusCode == 200){
                //get seperate rewards value
                balance.rewards = JSON.parse(rewards.content).rewards;
                //get total rewards value
                balance.total_rewards= JSON.parse(rewards.content).total;
                
            }
        }
        catch (e){
            console.log(url);
            console.log(e);
        }

        // get commission
        let validator = Validators.findOne(
            {$or: [{operator_address:address}, {delegator_address:address}, {address:address}]})
        if (validator) {
            let url = API + '/cosmos/distribution/v1beta1/validators/'+validator.operator_address+'/commission';
            balance.operatorAddress = validator.operator_address;
            try {
                let rewards = HTTP.get(url);
                if (rewards.statusCode == 200){
                    let content = JSON.parse(rewards.content).commission;
                    if (content.commission && content.commission.length > 0)
                        balance.commission = content.commission;

                }

            }
            catch (e){
                console.log(url);
                console.log(e)
            }
        }

        return balance;
    },
    'accounts.getDelegation'(address, validator){
        this.unblock();
        let url = `/cosmos/staking/v1beta1/delegators/${address}/delegations/${validator}`;
        let delegations = fetchFromUrl(url);
        delegations = delegations && delegations.data.result;
        if (delegations && delegations.shares)
            delegations.shares = parseFloat(delegations.shares);

        url = `/cosmos/staking/v1beta1/delegators/${address}/redelegations?dst_validator_addr=${validator}`;
        let relegations = fetchFromUrl(url);
        relegations = relegations && relegations.data.result;
        let completionTime;
        if (relegations) {
            relegations.forEach((relegation) => {
                let entries = relegation.entries
                let time = new Date(entries[entries.length-1].completion_time)
                if (!completionTime || time > completionTime)
                    completionTime = time
            })
            delegations.redelegationCompletionTime = completionTime;
        }

        url = `/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations/${validator}`;
        let undelegations = fetchFromUrl(url);
        undelegations = undelegations && undelegations.data.result;
        if (undelegations) {
            delegations.unbonding = undelegations.entries.length;
            delegations.unbondingCompletionTime = undelegations.entries[0].completion_time;
        }
        return delegations;
    },
    'accounts.getAllDelegations'(address){
        this.unblock();
        let url = API + '/cosmos/staking/v1beta1/delegators/'+address+'/delegations';

        try{
            let delegations = HTTP.get(url);
            if (delegations.statusCode == 200){
                delegations = JSON.parse(delegations.content).result;
                if (delegations && delegations.length > 0){
                    delegations.forEach((delegation, i) => {
                        if (delegations[i] && delegations[i].shares)
                            delegations[i].shares = parseFloat(delegations[i].shares);
                    })
                }

                return delegations;
            };
        }
        catch (e){
            console.log(url);
            console.log(e);
        }
    },
    'accounts.getAllUnbondings'(address){
        this.unblock();
        let url = API + '/cosmos/staking/v1beta1/delegators/'+address+'/unbonding_delegations';

        try{
            let unbondings = HTTP.get(url);
            if (unbondings.statusCode == 200){
                unbondings = JSON.parse(unbondings.content).result;
                return unbondings;
            };
        }
        catch (e){
            console.log(url);
            console.log(e);
        }
    },
    'accounts.getAllRedelegations'(address, validator){
        this.unblock();        
        let url = `/cosmos/staking/v1beta1/v1beta1/delegators/${address}/redelegations&src_validator_addr=${validator}`;
        try{
            let result = fetchFromUrl(url);
            if (result && result.data) {
                let redelegations = {}
                result.data.forEach((redelegation) => {
                    let entries = redelegation.entries;
                    redelegations[redelegation.validator_dst_address] = {
                        count: entries.length,
                        completionTime: entries[0].completion_time
                    }
                })
                return redelegations
            }
        }
        catch(e){
            console.log(url);
            console.log(e);
        }
    },
    'accounts.getRedelegations'(address) {
        this.unblock();
        let url = API + '/cosmos/staking/v1beta1/v1beta1/delegators/' + address +'/redelegations';

        try {
            let userRedelegations = HTTP.get(url);
            if (userRedelegations.statusCode == 200) {
                userRedelegations = JSON.parse(userRedelegations.content).result;

                return userRedelegations;
            };
        } catch (e) {
            console.log(url);
            console.log(e.response.content);
        }
    },
}) 
