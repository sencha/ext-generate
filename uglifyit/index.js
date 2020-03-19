var concat = require('concat-files');
var uglify = require("uglify-js");
var fs = require('fs');

//run this after npm run build (for babel)

var files = [
  `dist/popup.js`,
  `dist/panel.component.js`,
]

concat(files, `dist/popup.debug.js`, function(err) {
  if (err) throw err
  console.log(`concat is done: dist/popup.debug.js`);
  console.log('processing uglify...');
  // var ugly = uglify.minify({
  //   "popup": fs.readFileSync(`dist/popup.debug.js`, "utf8")
  // })
  var fileStuff = fs.readFileSync(`dist/popup.debug.js`, "utf8")
  //console.log(fileStuff)
  var ugly = uglify.minify({"file1.js":fileStuff})
  //console.log(ugly)
  fs.writeFile(`dist/popup.min.js`, ugly.code, function (err){
    if(err) {
      console.log(err);
      //reject(err);
    } else {
      console.log(`ufilify is done: dist/popup.min.js`);
      //resolve(0);
    }
  });
})




// var file = fs.readFileSync(`dist/popup.js`, "utf8")
// //console.log(file)

// var ugly = uglify.minify(file)
// console.log(ugly.code)
// console.log(ugly.error)
// fs.writeFile(`dist/popup.min.js`, ugly.code, function (err){
//   if(err) {
//     console.log(err);

//   } else {
//     console.log(`ufilify is done: dist/popup.min.js`);

//   }
// });