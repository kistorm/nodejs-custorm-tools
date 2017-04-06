/**
 * Created by kistorm on 16/7/18.
 */
var redis = require("redis");

var client1 = redis.createClient('6379', 'localhost');

client1.on("message", function (channel, message) {
    //订阅消息被触发时的绑定函数1
    console.log(channel,message);
});

client1.subscribe("fly");  //订阅 yijiebuyi 频道
