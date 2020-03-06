exports.doDocStuff =(xtype, info, item) => {
  var XtypeForDoc = xtype.charAt(0).toUpperCase() + xtype.slice(1).replace(/-/g,'_')

  global.docMenu
  if (global.docMenu == undefined) {
    global.docMenu = []
  }

  let obj = global.docMenu.find(o => o.xtype === xtype);
  if (obj == undefined) {
    var oMenu = {}
    oMenu.text = XtypeForDoc;
    oMenu.xtype = xtype;
    oMenu.extends = item.extends;
    oMenu.name = item.name;
    oMenu.iconCls = 'x-fa fa-cog';
    oMenu.leaf = true;
    global.docMenu.push(oMenu);
  }

  //item.propertyString = '<pre style="user-select: text;">'
  item.propertyString = ''
  item.docProperties = []
  var ewcProperties = ''
  info.propertyObj.propertiesArray.forEach(property => {
      var o = {}
      o.name = property.name
      o.text = property.text
      item.docProperties.push(o)
      var Text = ''
      if (property.text != undefined) {
          Text = property.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }
      property.ewc = `${property.name}<br/>${Text}<br/><br/>`;

      PropertyName = property.name
      item.propertyString = item.propertyString + require("./docs").getReactProperties(PropertyName, Text, XtypeForDoc);

      ewcProperties = ewcProperties + property.ewc + '\n';
  });
  //item.propertyString = item.propertyString + '</pre>'

  item.docEvents = []
  var ewcEvents = ''
  info.eventObj.eventsArray.forEach(event => {
    var o = {}
    o.name = event.name
    o.parameters = event.parameters
    item.docEvents.push(o)
      var parameters = ''
      event.parameters.forEach(parameter => {
          if (parameter != undefined) {
              parameters = parameters + parameter + ', '
          }
      })
      const EventName = event.name.charAt(0).toUpperCase() + event.name.slice(1).toLowerCase();
      const Parameters = parameters.replace(/,\s*$/, "");
      event.ewc = `on${EventName} = ( {detail: { ${Parameters} }} ) => {}<br/>`;
      //var reactEvents = require("./docs").getReactEvents(EventName, XtypeForDoc, Parameters);
      item.eventString = item.eventString + require("./docs").getReactEvents(EventName, Parameters, XtypeForDoc);
      ewcEvents = ewcEvents + event.ewc + '\n'
  });

  var res = 'undef'
  var restOfText = ''
  if (item.text !== undefined) {

      function replacerCfgLink(match) {
        //console.log(match)
        var s = match.indexOf('!')
        var e = match.lastIndexOf('#')
        var val = match.substring(s+1,e-1)
        return `<a href="javascript:sendToContext('cfg','${val}');">${val}</a>`
        //return `<span class="tooltip" xstyle="background:lightgray;border-bottom: 1px dotted black;">${val}<span class="tooltiptext">Tooltip text</span></span>`
      }

      function replacerHeader2(match) {
        var s = match.indexOf(' ')
        var val = match.substring(s+1)
        return `<div><span style="font-weight:bold;color:#163d72;background:white;padding: 5px 5px 5px 0;font-size:18px;">${val}</span></div>`
      }

      function replacerGlobalCssLink(match) {
        //console.log(match)
        var s = match.indexOf('!')
        var e = match.lastIndexOf('#')
        var val = match.substring(s+1,e-1)
        return `[global css link ${val}]`
      }

      function replacerExtJS(match) {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)

        //return `<textarea readonly style="background:red;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;">${match}</textarea>`
        return `<textarea style="background:red;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:400px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`

      }

      function replacerReact(match) {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'React'
        //match = escape(match)
        return `<textarea style="background:blue;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:green;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea readonly>${match}</textarea></div>`
      }

      function replacerAngular(match) {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'Angular'
        //match = escape(match)
        return `<textarea style="background:purple;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:blue;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea style="width:100%;height:100%;" readonly>${match}</textarea></div>`
      }



      function replacerHTML(match) {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //console.log(match)
        return `<textarea style="background:yellow;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:green;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea style="width:100%;height:100%;" readonly>${match}</textarea></div>`
        //return 'html example here...'
      }

      function replacerWebComponents(match) {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'WebComponents'
        //match = escape(match)
        return `<textarea style="background:green;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:yellow;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea readonly>${match}</textarea></div>`
      }


      // function replacerJavaScript(match) {
      //   //console.log(match.length)
      //   console.log(match)
      //   return `<div style="margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;background:lightgray">${match}</div>`
      //   //return 'javascript example here...'
      //   //console.log(p1)
      //   //console.log(string)
      //   // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      //   //return [p1, p2, p3].join(' - ');
      // }



      //{@link #cfg!iconAlign #iconAlign}

      if (xtype == 'accordion') {
        console.log(item.text)

      //var afterCfgLink = item.text.replace( new RegExp( /[{]@link #cfg(.)*?[}]/g) , replacerCfgLink )
      //var afterHeader2 = afterCfgLink.replace( new RegExp( /## (.)*?[\n]/g) , replacerHeader2 )
      //var afterGlobalCssLink = afterHeader2.replace( new RegExp( /[{]@link Global_CSS\#var(.)*?[}]/g) , replacerGlobalCssLink )

      var afterExtJS = item.text.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'extjs'(.|\n)*?```/g ) , replacerExtJS )
      var afterReact = afterExtJS.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-react'(.|\n)*?```/g ) , replacerReact )
      var afterAngular = afterReact.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-angular'(.|\n)*?```/g ) , replacerAngular )
      var afterHTML = afterAngular.replace( new RegExp( /```html(.|\n)*?(.|\n)*?```/g ) , replacerHTML )
      var afterWebComponents = afterHTML.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-web-components'(.|\n)*?```/g ) , replacerWebComponents )







      var afterAll = afterWebComponents
      res = afterAll.substring(0, afterAll.indexOf(`\n\n`))



      restOfText = '<div style="user-select: text;">' + afterAll.slice(afterAll.indexOf(`\n\n`)+2) + '</div>'
      }
      else {
        res = 'hi'
        restOfText = 'hi'
      }



      // var examples = Array.from(item.text.matchAll(new RegExp( /```javascript(.|\n)*?```/ , 'g')), m => m[0]);
      // examples.forEach(example => {
      //   console.log(example)
      //   //console.log(`Found ${example[0]}\n start=${example.index} end=${example.index + example[0].length}.`);
      // })
      //console.log(a)
      //var allMatchesJavascript = item.text.match(new RegExp(/```javascript(.|\n)*?```/g))
      // var examples = item.text.matchAll( new RegExp( /```javascript(.|\n)*?```/ , 'g') )
      // //console.log(examples)
      // for (const example of examples) {
      //   //console.log(example)
      //   console.log(`Found start=${example.index} end=${example.index + example[0].length}.`);
      //   //console.log(`Found ${example[0]}\n start=${example.index} end=${example.index + example[0].length}.`);
      // }
    //}

    ////  if (examples != null) {
    //     allMatchesJavascript.forEach(theMatch => {
          //console.log(`\n\nnext\n\n`)
          //console.log(theMatch)
          //var re2 = new RegExp(/\@example(.|\n)*?\}\)/g);
          //var re2 = new RegExp(/\@example/g);
          //var m2 =theMatch.match(new RegExp(/\@example\((?>\((?<c>)|[^()]+|\)(?<-c>))*(?(c)(?!))\)/g))
         // var matches =theMatch.matchAll( new RegExp( /\@example[(][{](.|\n)*?[}][)]/ , 'g') )
          // matches.forEach(match => {
          //   console.log(match)
          //   console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
          // })
     //     for (const match of matches) {
    //        console.log(match)
            //console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
    //      }

          //console.log(m2[0])
          //var m3 =m2[0].match( new RegExp( /[{](.|\n)*?[}]/ ) )
          //console.log(m3[0])
          //eval('var obj='+m3[0]);
          //console.log(obj.framework);
          //var j = JSON.parse(m3[0])
          //console.log(m3[0].framework)
    //    })
    //  }
    }






  var xtypeName = `Ext${xtype.charAt(0).toUpperCase() + xtype.slice(1).toLowerCase()}`
  var values = {
    title: `&lt;${xtypeName}&gt;&lt;/${xtypeName}&gt;`,
    ExtWebComponentsTitle:`&lt;ext-${xtype}&gt;&lt;/ext-${xtype}&gt;`,
    ExtAngularTitle: `&lt;${xtypeName}&gt;&lt;/${xtypeName}&gt;`,
    ExtReactTitle: `&lt;${xtypeName}/&gt;`,
    docProperties: item.docProperties,
    docEvents: item.docEvents,
    eventString : item.eventString,
    propertyString: item.propertyString,
    first: res,
    text: restOfText
  }
  var docPackageFolder2 = `/Volumes/BOOTCAMP/_git/sencha/ext-generate/docApp/data/doc-modern/`
  fs.writeFileSync(`${docPackageFolder2}ext-react-${info.toolkit}-${xtype}.json`, JSON.stringify(values, null, ' '));
  //writeTemplateFile(`./filetemplates/docs/docTest.tpl`, `${docPackageFolder}ext-react-${info.toolkit}-${xtype}.doc.html`, values)


  fs.writeFileSync(`${docPackageFolder2}ext-react-${info.toolkit}-aamenu.json`, JSON.stringify(global.docMenu, null, ' '));


  // var n = 0
  // if (item.text != undefined) {
  //     n = item.text.indexOf(". ");
  // }
  // var text200 = ''; try {text200 = item.text.substring(0, n+1)}catch(e) {}
  // var Xtype = xtype.charAt(0).toUpperCase() + xtype.slice(1).replace(/-/g,'_');
  //var xtype = xtypes[j];

  // var values3 = {
  //     ewcEvents : ewcEvents,
  //     ewcProperties : ewcProperties,
  //     propertiesDocs: info.propertyObj.propertiesDocs,
  //     methodsDocs: info.methodObj.methodsDocs,
  //     eventsDocs: info.eventObj.eventsDocs,
  //     //sPROPERTIESGETSET: sGETSET,
  //     sMETHODS: info.eventObj.sMETHODS,
  //     sPROPERTIES: info.propertyObj.sPROPERTIES,
  //     //sPROPERTIESOBJECT: sPROPERTIESOBJECT,
  //     sEVENTS: info.eventObj.sEVENTS,
  //     sEVENTNAMES: info.eventObj.sEVENTNAMES,
  //     //sEVENTSGETSET: sEVENTSGETSET,
  //     classname: classname,
  //     folder: folder,
  //     Xtype: Xtype,
  //     xtype: xtypes[j],
  //     alias: item.alias,
  //     extend:item.extend,
  //     extenders:item.extenders,
  //     mixed:item.mixed,
  //     mixins:item.mixins,
  //     name:item.name,
  //     requires:item.requires,
  //     text:item.text,
  //     text200: text200,
  //     items:item.items,
  //     src:item.src
  // }

  // all.push({
  //   xtype: xtypes[j]
  // })
  // docs.push({
  //     xtype: xtypes[j],
  //     hash: xtypes[j],
  //     leaf: 'true',
  //     iconCls: 'x-fa fa-map',
  //     desc: item.text,
  //     text: xtypes[j],
  //     properties: info.propertyObj.propertiesArray,
  //     methods: info.methodObj.methodsArray,
  //     events: info.eventObj.eventsArray,
  // })
  //writeTemplateFile(`${templateFolder}docs/docdetail.tpl`, `${docStagingFolder}ext-${xtypes[j]}.doc.html`, values3)
  //writeTemplateFile(`${templateFolder}docs/docdata.tpl`, `${docStagingFolder}ext-${xtypes[j]}.doc.js`, {props: info.propertyObj.propNames.toString()})
  //docs




}


exports.getReactEvents =(EventName, Parameters, XtypeForDoc) => {
return`
<div class="name" onclick="toggleIt('event','${EventName}')">on${EventName} = ({${Parameters}})=> {);</div>
<pre id="${EventName}" class="code" style="display:none;">
import React, { Component } from 'react';
import { Ext${XtypeForDoc} } from "@sencha/ext-react-modern";

export default class App extends Component {
  on${EventName} = ({${Parameters}}) => {
    console.log('${EventName}')
  };

  render() {
    return (
      &lt;Ext${XtypeForDoc} on${EventName}={this.on${EventName}}&gt;&lt;/Ext${XtypeForDoc}&gt;
    )
  }
}
</pre>
`
}

exports.getReactProperties =(PropertyName, Text, XtypeForDoc) => {
  return`
  <div class="name" onclick="toggleIt('cfg','${PropertyName}')">${PropertyName}</div>
  <pre id="${PropertyName}" class="code" style="display:none;">
  import React, { Component } from 'react';
  import { Ext${XtypeForDoc} } from "@sencha/ext-react-modern";

    render() {
      return (
        &lt;Ext${XtypeForDoc} ${PropertyName}=''&gt;&lt;/Ext${XtypeForDoc}&gt;
      )
    }
  }
  </pre>
  `
  }