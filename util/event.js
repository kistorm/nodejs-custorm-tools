/**
 * Created by kistorm on 16/2/3.
 */

var inherits = require('util').inherits,
    EventEmitter = require('events').EventEmitter;

function demo(){
    EventEmitter.call(this);
}
inherits(demo,EventEmitter);


var c = new demo();
c.on('end',function(end){
    console.log(end);
})
c.on('hello',function(data){
    console.log(data);
    c.emit('end','x');
})

c.emit('hello','fff');