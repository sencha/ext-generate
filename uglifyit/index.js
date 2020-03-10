var uglify = require("uglify-js");
var fs = require('fs');

var file = fs.readFileSync(`dist/popup.js`, "utf8")
//console.log(file)

var ugly = uglify.minify(file)
console.log(ugly.code)
console.log(ugly.error)
fs.writeFile(`dist/popup.min.js`, ugly.code, function (err){
  if(err) {
    console.log(err);

  } else {
    console.log(`ufilify is done: dist/popup.min.js`);

  }
});