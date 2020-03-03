const fs = require("fs-extra");
const chalk = require('chalk');
global["rimraf"] = require("rimraf");

var options = [
  { toolkit: 'modern', theme: 'ios' },
  { toolkit: 'modern', theme: 'material' },
  { toolkit: 'modern', theme: 'neptune' },
  { toolkit: 'modern', theme: 'triton' },
  { toolkit: 'classic', theme: 'aria' },
  { toolkit: 'classic', theme: 'crisp' },
  { toolkit: 'classic', theme: 'graphite' },
  { toolkit: 'classic', theme: 'gray' },
  { toolkit: 'classic', theme: 'material' },
  { toolkit: 'classic', theme: 'neptune' },
  { toolkit: 'classic', theme: 'triton' },

  // { toolkit: 'classic', theme: 'classic-sandbox' },
  // { toolkit: 'classic', theme: 'crisp-touch' },
  // { toolkit: 'classic', theme: 'neptune-touch' },
]

go(options)

async function go(options) {
  var vars = {child: null};

  console.log(`processing ${options.length} themes...`)
  console.log(`cwd: ${process.cwd()}`)

  processErrors(vars);
  for (var i = 0; i < options.length; i++) {
      var themeBaseFolder = `./allOut/themes/${options[i].toolkit}`;
      var themeFolder = `${themeBaseFolder}/${options[i].theme}`;

      console.log(`\n${chalk.green("Step 1:")} delete theme: ${themeFolder}`)
      rimraf.sync(`${themeFolder}`);

      var senchaGenerateApp =  getSenchaGenerateApp(options[i].toolkit, options[i].theme);
      console.log(`${chalk.green("Step 2:")} sencha generate app: ${senchaGenerateApp}`)
      console.log(`cwd: ${themeBaseFolder}`)
      await _executeAsync(senchaGenerateApp, themeBaseFolder, vars);

      console.log(`${chalk.green("Step 3:")} modify app.json`)
      modifyAppJson(themeFolder)

      console.log(`${chalk.green("Step 4:")} modify app.js`)
      modifyAppJs(themeFolder)

      console.log(`${chalk.green("Step 5:")} sencha app build production`)
      await _executeAsync(['app','build','production'], `${themeFolder}`, vars);

      var from = `${themeFolder}/build/production/${options[i].theme}/resources`
      var to = `./allOut/ext-runtime-${options[i].toolkit}/${options[i].theme}`
      console.log(`${chalk.green("Step 6:")} copy from: ${from} to: ${to}`)
      fs.copySync(from,to)

      var from2 = `./calendar/`
      var to2 = `./allOut/ext-runtime-${options[i].toolkit}/${options[i].theme}/calendar/`
      console.log(`${chalk.green("Step 7:")} copy from: ${from2} to: ${to2}`)
      fs.copySync(from2,to2)

  }
}

function getSenchaGenerateApp(toolkit, appName) {
  var appPath = `./${appName}`
  var toolkitParm = `-${toolkit}`
  var themeParm = `theme-${appName}`
  return ['-sdk', '/Volumes/BOOTCAMP/aaExt/ext-7.2.0.57', 'generate', 'app', '-theme', themeParm, toolkitParm, appName, appPath]
}

function modifyAppJson(themeFolder) {
  var appJsonFileName = `${themeFolder}/app.json`
  var appJsonData = fs.readFileSync(appJsonFileName, 'utf8');
  var appJsonDataWithoutComments = appJsonData.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'');
  const appJsonDataJson = JSON.parse(appJsonDataWithoutComments);
  if (appJsonDataJson.requires.length == 1) {
    if (appJsonDataJson.requires[0] == "font-awesome") {
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

function modifyAppJs(themeFolder) {
  fs.copySync(`${themeFolder}/app.js`,`${themeFolder}/app.back.js`);
  var appJsData = fs.readFileSync(`${themeFolder}/app.js`, 'utf8');
  b = `    ,'Ext.*'\n`
  var position = appJsData.indexOf('],');
  var appJsDataNew = appJsData.substring(0, position) + b + appJsData.substring(position);
  fs.writeFileSync(`${themeFolder}/app.js`, appJsDataNew);
}

async function _executeAsync (parms, outputPath, vars) {
  const crossSpawn = require('cross-spawn-with-kill')
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
