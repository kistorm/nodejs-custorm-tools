//Array Remove(array_Index)方法拓展
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);

};
/**
 * 有序排列数组是否存在差集
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
Array.prototype.existDS = function (arr2) {
    if (this.length != arr2.length) {
        return true;
    }
    for (var i = 0; i < this.length; i++) {
        if (arr2[i] != (this[i])) {
            return true;
        }
    }
    return false;
}

//合并两个数组里面的相同元素形成新数组
Array.prototype.uniqueByPrototype = function (prototypeName) {
    var a = this.concat();
    if (!prototypeName) return a;
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (prototypeName && a[i][prototypeName] == a[j][prototypeName]) {
                a.splice(j, 1);
            }
        }
    }
    return a;
};

exports.moveArrayElement = function(a1,a2,a3){
    //a1:all Data Array
    //a2:index array
    //a3:data array
    for(var i = 0;i< a1.length;i++){
        a1[a2[i]] = a3[i];
    }
    return a1;
}
var moveArrayElementTest = function(){
    var a = [1,2,3,4,5];
    var b = ['s','as','sam'];
    var c = [2,1,3];
    for(var i = 0;i< a.length;i++){
        a[c[i]] = b[i];
    }
    console.log("a:"+a);
    console.log("b:"+b);
};
