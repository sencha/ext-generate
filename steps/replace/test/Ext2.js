export function doExt2() {
  var se = document.createElement('script');
  se.type = "text/javascript";
  se.text = `
  var Ext2 = Ext2 || {};
  var escapeRegexRe = /([-.*+?\\^$\{\}()|\\[\\]\\/\\\\])/g
  window['Ext2'] = Ext2
  Ext2.name = 'marc'
  console.log(this)
  console.log(window)
  console.log(document)
  function jamie (){console.info(arguments.callee.caller.name);};
  function jiminyCricket (){jamie();}
  jiminyCricket ();
  `;
  document.getElementsByTagName('head')[0].appendChild(se);
}

export function doExt2css() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML =  `
  .ext2style {
    color: red;
  }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
}