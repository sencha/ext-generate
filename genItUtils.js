exports.writeTemplateFile =(tplFile, outFile, vars) => {
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

exports.run = (parm, cwd) => {
  var all = parm.split(' ')
  var command = all[0]
  var args = all.slice(1)
  if (cwd == undefined) {cwd = process.cwd()}
  return promise = new Promise((resolve, reject) => {
    let options = {cwd: cwd, stdio: 'inherit', encoding: 'utf-8'}
    //console.log(color(command + ' ' + args.toString().replace(',', ' ')) + ' in ' + cwd)
    let child = require('child_process').spawn(command, args, options)
    child.on('close', (code, signal) => {resolve({code, signal})})
    child.on('error', (error) => {reject(error)})
  })
}


function getItems(o, type) {
  var array = o.items.filter(function(obj) {
      return obj.$type == type;
  });
  if (array.length == 1) {
      return array[0].items;
  } else {
      return [];
  }
}

exports.doProperties = (o) => {
  var doAllinXtype = true; //dont think this is needed

  var sLocalPROPERTIES = `\n`;
  //var sPROPERTIESOBJECT = `\n`;
  var sGETSET = "";
  var propertiesArray = []

  //   var configsArray = o.items.filter(function(obj) {return obj.$type == 'configs';});
  //   if (configsArray.length == 1) {

  var haveResponsiveConfig = false;
  var propertiesLocalDocs = `<div class="select-div"><select id="propertiesDocs" onchange="changeProperty()" name="propertiesDocs">\n`



  getItems(o, "configs").forEach(function(config, index, array) {
      var propertyLocalObj = {}


      propertiesLocalDocs = propertiesLocalDocs + `    <option value="${config.text}">${config.name}</option>\n`

      if (config.from == undefined || doAllinXtype == true) {
      //configsArray[0].items.forEach(function (config, index, array) {
          if (config.deprecatedMessage == undefined) {
              sLocalPROPERTIES = `${sLocalPROPERTIES}    '${config.name}',\n`;
              var type = "";
              if (config.type == undefined) {
                  //log('', `${xtype}${tb}${config.name}`)
                  type = "any";
              } else {
                  type = config.type.replace(/"/g, "'");
              }
              if (config.name == "responsiveConfig") {
                  haveResponsiveConfig = true;
              }

              var typeArray = type.split("/");
              var s = "[";
              var i = 0;
              typeArray.forEach(function(currentValue, index, arr) {
                  var comma = "";
                  if (i > 0) {
                      comma = ",";
                  }
                  i++;
                  var newVal;
                  if (currentValue.startsWith("Ext.")) {
                      newVal = currentValue;
                  } else {
                      newVal = currentValue.toLowerCase();
                  }
                  s = s + `${comma}"${newVal}"`;
              });
              s = s + `]`;

              propertyLocalObj.text = config.text
              propertyLocalObj.name = config.name

              //sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"${config.name}":${s},\n`;




              // sGETSET =
              //     sGETSET +
              //     tab +
              //     `get ${config.name}(){return this.getAttribute('${config.name}')};
              //     set ${config.name}(${config.name}){this.setAttribute('${config.name}',${config.name})}\n`;
          }
      }
      propertiesArray.push(propertyLocalObj)
  });

//    sLocalPROPERTIES = `${sPROPERTIES}${tab}${tab}'platformConfig',\n`;
//    if (haveResponsiveConfig == false) {
//        sLocalPROPERTIES = `${sPROPERTIES}${tab}${tab}'responsiveConfig',\n`;
//    }
  //sLocalPROPERTIES = `${sPROPERTIES}'align',\n`;
//    sLocalPROPERTIES = `${sPROPERTIES}${tab}${tab}'fitToParent',\n`;
//    sLocalPROPERTIES = `${sPROPERTIES}${tab}${tab}'tab',\n`;
//    sLocalPROPERTIES = `${sPROPERTIES}${tab}${tab}'config'\n`;

//    sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"platformConfig": "Object",\n`;
//    if (haveResponsiveConfig == false) {
//        sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"responsiveConfig": "Object",\n`;
//    }
//    //sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"align": "Object",\n`;
//    sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"tab": "Object",\n`;
//    sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"fitToParent": "Boolean",\n`;
//    sPROPERTIESOBJECT = `${sPROPERTIESOBJECT}"config": "Object",\n`;

  var eventName = "";
  eventName = "platformConfig";
  // sGETSET =
  //     sGETSET +
  //     tab +
  //     `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;
  // if (haveResponsiveConfig == false) {
  //     eventName = "responsiveConfig";
  //     sGETSET =
  //         sGETSET +
  //         tab +
  //         `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;
  // }
  // eventName = "align";
  // sGETSET =
  //     sGETSET +
  //     tab +
  //     `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;
  // eventName = "fitToParent";
  // sGETSET =
  //     sGETSET +
  //     tab +
  //     `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;
  // eventName = "config";
  // sGETSET =
  //     sGETSET +
  //     tab +
  //     `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;

  //}

  propertiesLocalDocs = propertiesLocalDocs + `</select></div>\n`


  var propLocalNames = `['aMe', 'header', 'renderer', 'label','fitToParent','tab','config','platformConfig','extname','viewport','align','plugins','responsiveConfig','responsiveFormulas',`
  propertiesArray.forEach(property => {
    //info.propNames.push(property.name)
    propLocalNames = propLocalNames + `'${property.name}',`
  })
  propLocalNames = propLocalNames + `]`




  var o = {};
  o.propNames = propLocalNames;
  o.propertiesDocs = propertiesLocalDocs;
  o.sPROPERTIES = sLocalPROPERTIES;
  //o.sPROPERTIESOBJECT = sPROPERTIESOBJECT;
  //o.sGETSETPROPERTIES = sGETSET;
  o.propertiesArray = propertiesArray;
  return o;


}

exports.doMethods = (o) => {
  var methodsLocalDocs = `<div class="select-div"><select id="methodsDocs" onchange="changeMethod()" name="methodsDocs">\n`
  var sLocalMETHODS = "";
  var methodsArray = []

  getItems(o, "methods").forEach(function(method, index, array) {
      var methodObj = {}
      methodsLocalDocs = methodsLocalDocs + `    <option value="${method.text}">${method.name}</option>\n`


      if (method.from == undefined) {

          sLocalMETHODS = sLocalMETHODS + '  ' + '  ' + "{ name:'" + method.name + "', function: function"
          // sLocalMETHODS =
          //     sLocalMETHODS +
          //     tab +
          //     tab +
          //     "{ name:'" +
          //     method.name +
          //     "',function: function";
          var sItems = "";
          if (method.items !== undefined) {
              var arrayLength = method.items.length;
              for (var i = 0; i < arrayLength; i++) {
                  if (method.items[i].$type == "param") {
                      if (i == arrayLength-1){commaOrBlank= ''} else {commaOrBlank= ','};
                      // if (i == arrayLength - 1) {
                      //     commaOrBlank = "";
                      // } else {
                      //     commaOrBlank = ",";
                      // }
                      sItems = sItems + method.items[i].name + ",";
                  }
              }
          }
          sItems = sItems.substring(0, sItems.length - 1);
          sLocalMETHODS = sLocalMETHODS + "(" + sItems + ") { return this.ext." + method.name + "(" + sItems + ") } },\n";

          methodObj.text = method.text
          methodObj.name = method.name
          methodObj.items = sItems
          methodsArray.push(methodObj)
      }

      // sLocalMETHODS =
      //     sLocalMETHODS +
      //     "(" +
      //     sItems +
      //     ") { return this.ext." +
      //     method.name +
      //     "(" +
      //     sItems +
      //     ") } },\n";

  });
  methodsLocalDocs = methodsLocalDocs + `</select></div>\n`
  var o = {};
  o.methodsDocs = methodsLocalDocs;
  o.sMETHODS = sLocalMETHODS;
  o.methodsArray = methodsArray;
  return o;

}

exports.doEvents = (o) => {
  var eventsLocalDocs = `<div class="select-div"><select id="eventsDocs" onchange="changeEvent()" name="eventsDocs">\n`
  var sLocalEVENTS = `\n`;
  var sLocalEVENTNAMES = `\n`;
  //var sEVENTSGETSET = "";
  var eventsLocalArray = []
  getItems(o, "events").forEach(function(event, index, array) {
      //console.log(event)
      var eventObj = {}
      eventObj.name = event.name
      eventObj.text = event.text
      eventObj.parameters = []

      eventsLocalDocs = eventsLocalDocs + `    <option value="${event.text}">${event.name}</option>\n`


      if (event.name == undefined) {
          var s = event.inheritdoc;
          event.name = s.substr(s.indexOf("#") + 1);
      }
      //if (event.name == 'tap') { event.name = 'tapit' };

      var eventName = "on" + event.name;
      // sEVENTSGETSET =
      // sEVENTSGETSET +
      //     tab +
      //     `get ${eventName}(){return this.getAttribute('${eventName}')};set ${eventName}(${eventName}){this.setAttribute('${eventName}',${eventName})}\n`;

      sLocalEVENTS =
          sLocalEVENTS + '  ' + '  ' + "{name:'" + event.name + "', parameters:'";
      sLocalEVENTNAMES =
          sLocalEVENTNAMES + '  ' + '  ' + "'" + event.name + "'" + "," + '\n';

      //if (event.name == 'tap') {console.log(event.items) };



      if (event.items != undefined) {
          event.items.forEach(function(parameter, index, array) {
              if (parameter == undefined) {
                  return
              }
              if (index == array.length - 1) {
                  commaOrBlank = "";
              } else {
                  commaOrBlank = ",";
              }
              if (parameter.name == "this") {
                  //if (event.name == 'tap') {console.log(o) };
                  parameter.name = 'sender'; //o.xtype;
              }
              sLocalEVENTS = sLocalEVENTS + parameter.name + commaOrBlank;

              eventObj.parameters.push(parameter.name)

          });
      }
      sLocalEVENTS = sLocalEVENTS + "'}" + "," + '\n';
      eventsLocalArray.push(eventObj)
  });
  eventsLocalDocs = eventsLocalDocs + `</select></div>\n`



  sLocalEVENTS = sLocalEVENTS + '  ' + '  ' + "{name:'" +"ready" +"', parameters:'cmd,cmdAll'}" +"" + '\n';
  sLocalEVENTNAMES = sLocalEVENTNAMES + "'" + "ready" + "'" + "" + '\n';


  var eventLocalNames = `['ready',`
  eventsLocalArray.forEach(event => {
    //info.propNames.push(property.name)
    eventLocalNames = eventLocalNames + `'${event.name}',`
  })
  eventLocalNames = eventLocalNames + `]`



  var o = {};
  o.eventNames = eventLocalNames;
  o.eventsDocs = eventsLocalDocs;
  o.sEVENTS = sLocalEVENTS;
  o.sEVENTNAMES = sLocalEVENTNAMES;
  //o.sEVENTSGETSET = sEVENTSGETSET;
  o.eventsArray = eventsLocalArray;
  return o;
}