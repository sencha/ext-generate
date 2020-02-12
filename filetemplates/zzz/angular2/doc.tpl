<!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" type="text/css" href="docstyle.css">

<script>
function selectDoc(xtype) {
    console.log(xtype)
    //var xtype = 'accordion'
    //var theFrame = '<iframe width="560" height="315" src="http://127.0.0.1:5501/generators/ext-component-creator/GeneratedFolders/ext-ewc/src/lib/ext-' + xtype + '.doc.html" frameborder="0" allowfullscreen></iframe>'
    var theFrame = '<iframe width="100%" height="900px" src="ext-' + xtype + '.doc.html" frameborder="0" allowfullscreen></iframe>'
    console.log(theFrame)
    var frame = document.getElementById( "contentFrame" )
    frame.innerHTML = theFrame
}
</script>

</head>
<body>

<div style="padding-left:10px;font-size:24px;">ExtAngular 7.0 Documentation</div>

<div class="flex-container">
  <div style="height:900px;padding:10px;" class="frame thelist">{includedxtypes}</div>
  <div style="height:900px;width:100%;" class="theframe" id="contentFrame"></div>
</div>

</body>
</html>