/**
 * Created by kistorm on 15/8/4.
 */

var externalip =require('externalip');
exports=externalip(function(err,ip){
    console.log(ip);
})

