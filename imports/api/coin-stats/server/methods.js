import {
  Meteor
} from 'meteor/meteor';
import {
  CoinStats
} from '../coin-stats.js';
import {
  HTTP
} from 'meteor/http';

Meteor.methods({
  'coinStats.getCoinStats': function() {
    this.unblock();
    try {
      let now = new Date();
      now.setMinutes(0);
      let url = Meteor.settings.public.oracle;
      let response = HTTP.get(url);
      if (response.statusCode == 200) {
        let data = JSON.parse(response.content);
        data["usd"] = data["result"];
        return CoinStats.upsert({
          last_updated_at: now
        }, {
          $set: data
        });
      }
    } catch (e) {
      console.log(e);
    }

  },

  'coinStats.getStats': function(){
      this.unblock();
      let coinId = Meteor.settings.public.coingeckoId;
      if (coinId){
          return (CoinStats.findOne({},{sort:{last_updated_at:-1}}));
      }
      else{
          return "No coingecko Id provided.";
      }

  }
})
