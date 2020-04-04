var uglify = require("uglify-js");
var fs = require('fs');

var inputFile = `modern.material.fewest`
console.log('processing uglify...');
var ugly = uglify.minify({
  "ext": fs.readFileSync(`${inputFile}.js`, "utf8")
})
fs.writeFile(`${inputFile}.min.js`, ugly.code, function (err){
  if(err) {
    console.log(err);
    //reject(err);
  } else {
    console.log(`ufilify is done: ${inputFile}.min.js`);
    //resolve(0);
  }
});
