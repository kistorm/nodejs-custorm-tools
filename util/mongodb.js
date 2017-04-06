/**
 * Created by kistorm on 14-8-18.
 */
var mongoose=require('mongoose');
var pool={
    "appServerIP": "172.16.xx.xx",
    "dbIP": "172.16.xx.xx",
    "dbUrl": "mongodb://172.16.xx.xx:828,172.16.xx.xx:827/xx",
    "dbOptions": {
        "server": {
            "native_parser": true,
            "poolSize": 10,
            "auto_reconnect": true,
            "socketOptions": {
                "keepAlive": 300000,
                "connectTimeoutMS": 300000,
                "socketTimeoutMS": 300000
            },
            "reconnectTries": 30,
            "haInterval": 10000
        },
        "db": {
            "native_parser": true,
            "strategy": "ping",
            "readPreference": "primaryPreferred",
            "bufferMaxEntries": 5,
            "wtimeout": 300000
        },
        "replset": {
            "rs_name": "pictureWorks",
            "readPreference": "primaryPreferred",
            "strategy": "ping",
            "poolSize": 10,
            "socketOptions": {
                "keepAlive": 300000,
                "connectTimeoutMS": 300000,
                "socketTimeoutMS": 300000
            },
            "connectWithNoPrimary": false,
            "haInterval": 10000
        },
        "user": "xx",
        "pass": "xx"
    }
}
var connection = mongoose.createConnection(pool.dbUrl, pool.dbOptions, function (err) {
    if (!err) {
        instanceArray.push({
            appServerIP: pool.appServerIP,
            instance: require('./model.js')(connection)
        })
        cb(err, connection);
    } else {
        console.warn(pool.dbUrl + ' : has a err !');
        cb(err, null);
    }
})
connection.on('open', function () {
    console.log(pool.dbUrl + ' : has been opened !')
});
connection.on('error', function () {
    connection.close();
    console.warn(pool.dbUrl + ' : has a err !');
});
connection.on('reconnected', function () {
    console.warn('reconnected:' + pool.dbUrl)
});