var xml2js = require('xml2js');
var fs = require('fs');


var xmlstr = '<response> <head> <retCode>0000</retCode> <retMsg>交易成功</retMsg> </head> <body> <TransCode>PlaceOrder</TransCode> <Version>2.0.0</Version> <MerchantId>302020000058</MerchantId> <MerchOrderId>0201160607000202</MerchOrderId> <Amount>369</Amount> <TradeTime>20160609014530</TradeTime> <OrderId>302016060900121698</OrderId> <Sign>Niy9znNxrQWsSyTz9SIovIwDcadDogbOFD5PxJDDPR4OXo07cbvNAzQHMfdw3vPCQFPnggSgl1/qrJVKnCW/gBUwH8RLyyFpq52Ta8FqpPzbTXUHyvBdfnkNXdQk+0wfBKcRbBG9MeLIXcGPFM6ajF4K0vUmsWUXMHeMGJuNp+A=</Sign> </body> </response>';
xml2js.parseString(xmlstr, function (e, d) {
    console.log(e, JSON.stringify(d.response.head[0]));
    console.log(e, JSON.stringify(d.response.body[0]));
})
