'use strict'

const Telegram = require('telegram-node-bot'),
	tg = new Telegram.Telegram('560863709:AAFzmvWa0O07PII05NVFmcPQ20NGWU2UBCw',{
		workers: 1
	});
//const TelegramBaseController = Telegram.TelegramBaseController;
//const TextCommand = Telegram.TextCommand;
const PingController = require('./controllers/ltc');

tg.router
	.when(
		new Telegram.TextCommand("/price_ltc_bot","priceCommand"), 
		new PingController()
	)
		.when(
		new Telegram.TextCommand("/states_ltc_bot","statesCommand"), 
		new PingController()
	)
	.when(
		new Telegram.TextCommand("/donate_ltc_bot","donateCommand"), 
		new PingController()
	);
//.otherwise(new OtherwiseController());
