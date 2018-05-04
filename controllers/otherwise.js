'use strict'

const Telegram = require('telegram-node-bot');
class OtherwiseController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Sorry, I dont understand')
    }

}
module.exports = OtherwiseController;