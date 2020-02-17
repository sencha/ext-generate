var Ext = Ext || {};
//window['Ext'] = Ext;
//var global = window;
//window['global'] = window;
//global = window;
//console.log(window)
//console.log(global)

Ext.Function = {}
Ext.Function.flexSetter = {}

Object.defineProperty(Number, 'MIN_SAFE_INTEGER', {
  enumerable:false,
  writable:true,
  configurable:false
});




Ext.Base = (function(flexSetter) {
    var Base;
    return Base;
}(Ext.Function.flexSetter));


(function() {
    console.log(this)
    var global = this;
    var g = global.performance;

    var math = Math;
    console.log(Number)
    Number.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -(math.pow(2, 53) - 1);
    Number.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || math.pow(2, 53) - 1;


}).call(window);

//}());