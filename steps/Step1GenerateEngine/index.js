var fs = require('fs');
var uglify = require("uglify-js");
var concat = require('concat-files');
const copyFileSync = require('fs-copy-file-sync');
global["rimraf"] = require("rimraf");
global["mkdirp"] = require("mkdirp");

var localSDK = `./localsdk/`
var outputFolder = `./allOut/`
var classicFolderLocalSDK = `${localSDK}classic/`;
var modernFolderLocalSDK = `${localSDK}modern/`;

var folderRemoteSDK = `/Volumes/BOOTCAMP/aaExt/ext-7.2.0.57/`;

var classicEnterprisePathsRemoteSDK = [
  `${folderRemoteSDK}build/ext-all-debug.js`,
  `${folderRemoteSDK}packages/calendar/build/classic/calendar-debug.js`,
  `${folderRemoteSDK}build/packages/charts/classic/charts-debug.js`,
  `${folderRemoteSDK}packages/d3/build/classic/d3-debug.js`,
  `${folderRemoteSDK}packages/exporter/build/classic/exporter-debug.js`,
//  `${folderRemoteSDK}packages/froala-editor/froala-editor-debug.js`,
  `${folderRemoteSDK}packages/pivot/build/classic/pivot-debug.js`,
  `${folderRemoteSDK}packages/pivot-d3/build/classic/pivot-d3-debug.js`,
  `${folderRemoteSDK}build/packages/ux/classic/ux-debug.js`,
]

var classicEnterprisePathsLocalSDK = [
  `${classicFolderLocalSDK}ext-all-debug.js`,
  `${classicFolderLocalSDK}calendar-debug.js`,
  `${classicFolderLocalSDK}charts-debug.js`,
  `${classicFolderLocalSDK}d3-debug.js`,
  `${classicFolderLocalSDK}exporter-debug.js`,
//  `${classicFolderLocalSDK}froala-editor-debug.js`,
  `${classicFolderLocalSDK}pivot-debug.js`,
  `${classicFolderLocalSDK}pivot-d3-debug.js`,
  `${classicFolderLocalSDK}ux-debug.js`,
]
var outFileClassicEnterprise = `${outputFolder}classic.engine.enterprise`;

var classicProPathsRemoteSDK = [
  `${folderRemoteSDK}build/ext-all-debug.js`,
]
var classicProPathsLocalSDK = [
  `${classicFolderLocalSDK}ext-all-debug.js`,
]
var outFileClassicPro = `${outputFolder}classic.engine.pro`;


var modernEnterprisePathsRemoteSDK = [
  `${folderRemoteSDK}build/ext-modern-all-debug.js`,
  `${folderRemoteSDK}packages/calendar/build/modern/calendar-debug.js`,
  `${folderRemoteSDK}build/packages/charts/modern/charts-debug.js`,
  `${folderRemoteSDK}packages/d3/build/modern/d3-debug.js`,
  `${folderRemoteSDK}packages/exporter/build/modern/exporter-debug.js`,
  `${folderRemoteSDK}packages/froala-editor/froala-editor-debug.js`,
  `${folderRemoteSDK}packages/pivot/build/modern/pivot-debug.js`,
  `${folderRemoteSDK}packages/pivot-d3/build/modern/pivot-d3-debug.js`,
  `${folderRemoteSDK}build/packages/ux/modern/ux-debug.js`,
];

var modernEnterprisePathsLocalSDK = [
  `${modernFolderLocalSDK}ext-modern-all-debug.js`,
  `${modernFolderLocalSDK}calendar-debug.js`,
  `${modernFolderLocalSDK}charts-debug.js`,
  `${modernFolderLocalSDK}d3-debug.js`,
  `${modernFolderLocalSDK}exporter-debug.js`,
  `${modernFolderLocalSDK}froala-editor-debug.js`,
  `${modernFolderLocalSDK}pivot-debug.js`,
  `${modernFolderLocalSDK}pivot-d3-debug.js`,
  `${modernFolderLocalSDK}ux-debug.js`,
];
var outFileModernEnterprise = `${outputFolder}modern.engine.enterprise`;

var modernProPathsRemoteSDK = [
  `${folderRemoteSDK}build/ext-modern-all-debug.js`,
]
var modernProPathsLocalSDK = [
  `${modernFolderLocalSDK}ext-modern-all-debug.js`,
]
var outFileModernPro = `${outputFolder}modern.engine.pro`;

doInstall();
return

async function doInstall() {
  rimraf.sync(`${outputFolder}`);
  mkdirp.sync(`${outputFolder}`);
  rimraf.sync(`${localSDK}`);
  mkdirp.sync(`${localSDK}`);
  mkdirp.sync(`${classicFolderLocalSDK}`);
  mkdirp.sync(`${modernFolderLocalSDK}`);

  //get from SDK folder
  await copyAll(classicEnterprisePathsRemoteSDK, classicFolderLocalSDK);
  await copyAll(modernEnterprisePathsRemoteSDK, modernFolderLocalSDK);

  await concatAndUgilify(classicEnterprisePathsLocalSDK, outFileClassicEnterprise);
  await concatAndUgilify(modernEnterprisePathsLocalSDK, outFileModernEnterprise);

  await concatAndUgilify(classicProPathsLocalSDK, outFileClassicPro);
  await concatAndUgilify(modernProPathsLocalSDK, outFileModernPro);

  console.log(`done`)
}

function copyAll (inPaths, outputFolder) {
  console.log(`\ncopyall...`)
  inPaths.forEach( path => {
    var n = path.lastIndexOf('/');
    console.log(outputFolder + path.substr(n+1))
    copyFileSync(path, outputFolder + path.substr(n+1));
  })
}



function concatAndUgilify (inPaths, outFile) {
  return promise = new Promise((resolve, reject) => {
    console.log(`\nThese files - concat and uglify:`)
    console.log(inPaths)
    concat(inPaths, `${outFile}.debug.js`, function(err) {
      if (err) throw err
      console.log(`concat is done: ${outFile}.debug.js`);
      console.log('processing uglify...');
      var ugly = uglify.minify({
        "ext": fs.readFileSync(`${outFile}.debug.js`, "utf8")
      })
      fs.writeFile(`${outFile}.js`, ugly.code, function (err){
        if(err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`ufilify is done: ${outFile}.js`);
          resolve(0);
        }
      });
    })

  })
}
