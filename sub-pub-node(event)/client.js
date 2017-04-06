var inherits = require('util').inherits, EventEmitter = require('events').EventEmitter;
var Ticker = function () {
    EventEmitter.call(this);
}
inherits(Ticker, EventEmitter);

module.exports = ticker = new Ticker();

ticker.on("hello", function (result) {
    console.log(result);
});