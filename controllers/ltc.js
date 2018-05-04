'use strict'

const Telegram = require('telegram-node-bot');
var request = require('request');
class PingController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    priceHandler($) {
        //$.sendMessage('pong')
		request('https://api.huobi.pro/market/trade?symbol=ltcusdt', function (error1, response1, body1) {
			let priceLtcUsdt = Math.round(JSON.parse(body1).tick.data[0].price*100)/100;
			//console.log(JSON.parse(body1).tick.data[0].price);
			request('https://api.huobi.pro/market/trade?symbol=ltcbtc', function (error2, response2, body2) {
				let priceLtcBtc= Math.round(JSON.parse(body2).tick.data[0].price*1000000)/1000000;
				let msg = "1 LTC = " + priceLtcBtc + " sat = $" + priceLtcUsdt ;
				$.sendMessage(msg);
				//console.log(msg);
			});
		});
    }
    statesHandler($) {
        //$.sendMessage('pong')
		request('https://api.coinmarketcap.com/v2/ticker/2/', function (error1, response1, body1) {
			let change1h = Math.round(JSON.parse(body1).data.quotes.USD.percent_change_1h*100)/100;
			let change24h = Math.round(JSON.parse(body1).data.quotes.USD.percent_change_24h*100)/100;
			let change7d = Math.round(JSON.parse(body1).data.quotes.USD.percent_change_7d*100)/100;
			let volume24h = Math.round(JSON.parse(body1).data.quotes.USD.volume_24h);
			let marketcap = Math.round(JSON.parse(body1).data.quotes.USD.market_cap);
			let msg = "Price movements:\n" + 
					"1h=>"+change1h+"% | 24h=>"+change24h+"% | 7d=>"+change7d+"%"+
					"\nVolume (24h):" +
					"\n$"+convertFormatMarketcap(volume24h.toString())+
					"\nMarket Cap:"+
					"\n$"+convertFormatMarketcap(marketcap.toString());
			$.sendMessage(msg);
		});
    }
    donateHandler($) {
        $.sendMessage('donate LTC, address: MEXCbx4g33qgq5xrgvQvnQWxPiFopFNRwB');
    }
    get routes() {
        return {
            'priceCommand': 'priceHandler',
            'statesCommand': 'statesHandler',
            'donateCommand': 'donateHandler'
        }
    }
}
function convertFormatMarketcap(marketcap){
	let newFormat ="";
	//console.log(marketcap);
	for(let i=(marketcap.length-1);i>=0;i--){
		if((marketcap.length -i)%3==0 && i != 0)
			newFormat=","+marketcap[i]+newFormat;
		else
			newFormat=marketcap[i]+newFormat;
		//console.log(newFormat);
	}
	return newFormat;
}
// https://api.binance.com/api/v1/ticker/24hr?symbol=LTCUSDT
/*
function getPrice($){
	return new Promise((resolve)=>{
		request('https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT', function (error1, response1, body1) {
			let priceLtcUsdt = Math.round(JSON.parse(body1).price*100)/100;
			request('https://api.binance.com/api/v3/ticker/price?symbol=LTCBTC', function (error2, response2, body2) {
				let priceLtcBtc= Math.round(JSON.parse(body2).price*1000000)/1000000;
				let msg = "1 LTC = " + priceLtcBtc + " sat = $" + priceLtcUsdt ;
				$.sendMessage(msg);
				//console.log(msg);
			});
		});
		resolve();
	});
}*/
module.exports = PingController;