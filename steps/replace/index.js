global["fs"] = require("fs-extra");

console.log('hi')

//https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
var fs = require('fs')

//var fromFile = 'ext-runtime/ext-runtime-classic/classic.engine.pro.debug.js'
//var toFile = 'classic.engine.pro.debug.replaced.js'

// var fromFile = '../ext-runtime/ext-runtime-modern/modern.engine.pro.js'
// var toFile = 'modern.engine.pro.import.js'

//var fromFile = '../ext-runtime/ext-runtime-classic/classic.engine.pro.js'
//var toFile = 'classic.engine.pro.import.js'
// var fromFile = '../ext-runtime/ext-runtime-classic/classic.engine.enterprise.js'
// var toFile = 'classic.engine.enterprise.import.js'

//var fromFile = '../ext-runtime/ext-runtime-modern/modern.engine.enterprise.js'

//var fromFile = '../Step1GenerateEngine/allOut/classic.engine.enterprise.js'
//var toFile = 'classic.enterprise.js'

var fromFile = '../Step1GenerateEngine/allOut/modern.engine.enterprise.js'
var toFile = 'modern.enterprise.js'

var data1 = fs.readFileSync(fromFile, 'utf8');
var result1 = data1.replace(/\\/g, '\\\\');
var result2 = result1.replace(/\`/g, '\\\\\\`');
var result3 = result2.replace(/\$\{\}/g, '\$ \{ \}');
//var result4 = result3.replace(/[\\][3]/g, '\\\\3');
var result4 = result3.replace(/[\\][3]/g, '');

//fs.writeFileSync(toFile, 'var s=document.createElement("script");s.type = "text/javascript";s.text =`' + result4 + '`;document.getElementsByTagName("head")[0].appendChild(s);');
fs.writeFileSync(toFile, 'export function doIt(){var s=document.createElement("script");s.type = "text/javascript";s.text =`' + result4 + '`;document.getElementsByTagName("head")[0].appendChild(s);}');




// var start = `
// //export function doExt2() {
//   var se = document.createElement('script');
//   se.type = "text/javascript";
//   se.text = \`
// `
// var end = `
// \`;
// document.getElementsByTagName('head')[0].appendChild(se);
// //}
// `
//fs.writeFileSync(toFile, start + result3 + end);



// fs.readFile(fromFile, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   var result = data.replace(/[\\]/g, '\\');

//   fs.writeFile(toFile, result, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
// });