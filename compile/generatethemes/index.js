const fs = require("fs-extra");
const chalk = require('chalk');

const outBase = './build'
var options = [
//  {parms: getGenerateAppArray('classic', 'aria4'), path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'aria', path: outBase + '/themes'},
  //{type: 'generate', toolkit: 'classic', theme: 'classic-sandbox', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'crisp', path: outBase + '/themes'},
  //{type: 'generate', toolkit: 'classic', theme: 'crisp-touch', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'graphite', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'gray', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'material', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'neptune', path: outBase + '/themes'},
  //{type: 'generate', toolkit: 'classic', theme: 'neptune-touch', path: outBase + '/themes'},
  {type: 'generate', toolkit: 'classic', theme: 'triton', path: outBase + '/themes'},
]

var optionsTest = [
    {type: 'generate', toolkit: 'classic', theme: 'aria', path: outBase + '/themes'},
  ]

runSenchaCmd(options)

async function runSenchaCmd(options) {
  var vars = {child: null};
  processErrors(vars);
  for (var i = 0; i < options.length; i++) {
    switch(options[i].type) {
      case 'generate':
        console.log(`${chalk.green("[RUN]")}`)
        options[i].parms =  getGenerateAppArray(options[i].toolkit, options[i].theme);
        await _executeAsync(options[i].parms, options[i].path, vars);
        var themeFolder = `${options[i].path}/${options[i].theme}`;
        modifyAppJson(themeFolder)
        await _executeAsync(['app','build','production'], `${themeFolder}`, vars);
        var from = `${themeFolder}/build/production/${options[i].theme}/resources`
        var to = `${outBase}/ext-runtime-${options[i].toolkit}/${options[i].theme}`
        console.log('from: ' + from)
        console.log('to:' + to)
        fs.copySync(from,to)
        write(`${chalk.green("[END]")}\n\n`)
        break;
    }
  }
}

async function _executeAsync (parms, outputPath, vars) {

  const crossSpawn = require('cross-spawn-with-kill')

  console.log(`sencha ${parms}`)
  console.log(`path: ${outputPath}`)
  let sencha; try { sencha = require('@sencha/cmd') } catch (e) { sencha = 'sencha' }
  var opts = { cwd: outputPath, silent: true, stdio: 'pipe', encoding: 'utf-8'}
  await new Promise((resolve, reject) => {
    vars.child = crossSpawn(sencha, parms, opts)
    vars.child.on('close', (code, signal) => {
      if(code === 0) { resolve(0) }
      else {
        console.log('error: ' + code)
        resolve(0)
      }
    })
    vars.child.on('error', (error) => {
      console.log('error:')
      console.log(error)
      resolve(0)
    })
    vars.child.stdout.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      write(`${str}`)
    })
    vars.child.stderr.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      if (!str.includes("Picked up _JAVA_OPTIONS")) {
        console.log(`${chalk.red("[ERR]")} ${str}`)
      }
    })
  })
}

function getGenerateAppArray(toolkit, appName) {
  var appPath = `./${appName}`
  var toolkitParm = `-${toolkit}`
  var themeParm = `theme-${appName}`
  return ['-sdk', '/Volumes/BOOTCAMP/aaExt/ext-7.1.0.46', 'generate', 'app', '-theme', themeParm, toolkitParm, appName, appPath]
}

//function modifyAppJson(path, theme) {
//  var appJsonFileName = `${path}/${theme}/app.json`
function modifyAppJson(themeFolder) {
  var appJsonFileName = `${themeFolder}/app.json`
  var appJsonData = fs.readFileSync(appJsonFileName, 'utf8');
  var appJsonDataWithoutComments = appJsonData.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'');
  const appJsonDataJson = JSON.parse(appJsonDataWithoutComments);
  if (appJsonDataJson.requires.length == 1) {
    if (appJsonDataJson.requires[0] == "font-awesome") {
      console.log("editing 'requires' of app.json")
      appJsonDataJson.requires.push("font-ext");
      appJsonDataJson.requires.push("ux");
      appJsonDataJson.requires.push("d3");
      appJsonDataJson.requires.push("pivot-d3");
      appJsonDataJson.requires.push("exporter");
      appJsonDataJson.requires.push("pivot");
      appJsonDataJson.requires.push("calendar");
      appJsonDataJson.requires.push("charts");
      const appJsonNewString = JSON.stringify(appJsonDataJson, null, 2);
      fs.writeFileSync(appJsonFileName, appJsonNewString);
    }
  }
}




function processErrors(vars) {
  var v = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
  v.forEach(eventType => {
    process.on(eventType, function(eventType){
      if (vars.child != null) {
        console.log('\nnode process and sencha cmd process ended')
        vars.child.kill();
        vars.child = null;
      }
      else {
        if (eventType != 0) {
          console.log('\nnode process ended')
        }
      }
      process.exit();
    });
  })
}

function write(str) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${str}`)
}

// function logv(verbose, str) {
//   if (verbose == true) {
//     console.log(str)
//   }
// }


// var parms = ['app','build','production'];
// var paths = [
//   '../themes/classic/aria',
//   '../themes/classic/classic-sandbox'
// ]

//var parms = ['help']
//var parms = ['app','watch','--web-server',false,'development']

// var options = [
//   {
//     parms: ['app','build','production'],
//     path: '../themes/classic/aria'
//   },
//   {
//     parms: ['-sdk', '/Volumes/BOOTCAMP/aaExt/ext-7.1.0.46', 'generate', 'app', '-classic', 'triton3', './triton3'],
//     path: '../themes/classic'
//   },
// ]
// runDifferentSenchaCmd(options)

// var parms = ['-sdk', '/Volumes/BOOTCAMP/aaExt/ext-7.1.0.46', 'generate', 'app', '-classic', 'triton2', './triton2']
// var paths = [
//   '../themes/classic'
// ]
// runSameSenchaCmd(parms, paths)

// async function runSameSenchaCmd(parms, paths) {
//   logv(true, `sencha ${parms}`)
//   logv(true, `paths: ${paths}\n`)
//   var vars = {child: null}
//   processErrors(vars)
//   for (var i = 0; i < paths.length; i++) {
//     await _executeAsync(parms, paths[i], vars)
//   }
// }
