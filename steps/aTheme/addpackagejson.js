

writeTemplateFile =(tplFile, outFile, vars) => {
  require("./XTemplate");
  var path = require("path");
  var fs = require("fs-extra");
  //var tpl = new Ext.XTemplate(fs.readFileSync(path.resolve(tplFile)).toString());
  var tpl = new Ext.XTemplate(fs.readFileSync(tplFile));

  //console.log(tplFile)
  //console.log(path.resolve(tplFile)).toString()
  var t = tpl.apply(vars);
  fs.writeFileSync(outFile, t);
  //console.log(outFile)
  delete tpl;
}
var values
var outputFolder
var templateFolder = `./templates`

values = {toolkit: 'modern',theme: 'material'}
outputFolder = `./runtime/ext-${values.toolkit}-${values.theme}`
writeTemplateFile(`${templateFolder}/package.json.tpl`, `${outputFolder}/package.json`, values)

values = {toolkit: 'classic',theme: 'material'}
outputFolder = `./runtime/ext-${values.toolkit}-${values.theme}`
writeTemplateFile(`${templateFolder}/package.json.tpl`, `${outputFolder}/package.json`, values)

values = {toolkit: 'classic',theme: 'triton'}
outputFolder = `./runtime/ext-${values.toolkit}-${values.theme}`
writeTemplateFile(`${templateFolder}/package.json.tpl`, `${outputFolder}/package.json`, values)

