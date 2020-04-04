//(function(document, global) {


  //console.log(global)

//  'use strict';

  // function jamie (){console.info(arguments.callee.caller.name);};
  // function jiminyCricket (){jamie();}
  // jiminyCricket ();

  var se = document.createElement('script');
  se.type = "text/javascript";
  se.text = `

  var Ext2 = Ext2 || {};

  //var escapeRegexRe = /([-.*+?\$^{}()|\[\]\/\\])/g
  window['Ext2'] = Ext2
  Ext2.name = 'marc'
  console.log(this)
  console.log(window)
  console.log(document)

  function jamie (){console.info(arguments.callee.caller.name);};
  function jiminyCricket (){jamie();}
  jiminyCricket ();

  `; document.getElementsByTagName('head')[0].appendChild(se);


//}).call(window, document, window)  //.call(this)



// var scriptIt = function scriptIt() {


//   var se;
//   xhrObj.open('GET', "node_modules/@sencha/ext-web-components-" + toolkit + "/ext-runtime-" + toolkit + "/" + toolkit + ".engine.js", false);
//   xhrObj.send('');

//   if (xhrObj.responseText.substring(0, 3) != 'var') {
//     showError();
//     return;
//   }

//   se = document.createElement('script');
//   se.type = "text/javascript";
//   se.text = xhrObj.responseText;
//   document.getElementsByTagName('head')[0].appendChild(se);
// };

// scriptIt();









// (function(Ext, global, window, this, document) {

//   var Ext2 = Ext2 || {};
//   window['Ext2'] = Ext2
//   Ext2.name = 'marc'
//   console.log(this)
//   console.log(window)
//   console.log(document)

//   console.log(global)


//   // use $ for jQuery, global for window



// }(Ext, window, window, window, document));



//module.exports = Ext2