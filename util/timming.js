/**
 * Created by kistorm on 15/6/8.
 */
var schedule = require("node-schedule");

var rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 15;
rule.minute = 55;

exports.j = schedule.scheduleJob(rule, function(){
    console.log('Today is recognized by Rebecca Black!');
});