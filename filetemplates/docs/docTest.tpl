<!DOCTYPE HTML>
<html>
<head>

</head>

<script>
function toggleIt(id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
</script>

<style>
.heading {
  font-size: 28px;
  background: white;
  margin-bottom: 10px;
}

.firstparagraph {
  font-size: 16px;
  background: white;
  padding:10px;
  white-space:pre-wrap;
}

.allText {
  display:none;
  font-size: 16px;
  background: white;
  margin-bottom: 20px;
  padding:10px;
  white-space:pre-wrap;
}

.more {
  font-size: 14px;
  background: lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.title {
  font-family: Arial;
  font-size: 24px;
  background: white;
  margin-bottom: 10px;
  cursor: pointer;
}

.name {
  font-family: monospace;
  font-size: 18px;
  background: white;
  margin-bottom: 0;
  cursor: pointer;
}

.code {
  font-family: monospace;
  font-size: 16px;
  background: lightgray;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 300px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>




<style>
html body {
  font-family: Arial;
  font-size: 28px;
  margin: 0;
  width:100%;
  height:100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: blue;
  height: 50px;
  color: white;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}

.left {
  xflex-grow: 1;
  width: 300px;
  border-style: solid;
}

.center {
  xflex-grow: 2;
  border-style: solid;
  xoverflow: hidden;
  min-height: 100vh;
  padding: 10px;
}

.right {
  xflex-grow: 1;
    border-style: solid;
    width: 300px;
}

.footer {
  background: blue;
  height: 50px;
  color: white;
}
</style>

<body>
<div class="wrapper">
  <div class="header">header</div>
  <div class="main">
    <div class="left">left121----------</div>
    <div class="center">

        <div id="title" class="heading"> {title} </div>
        <div class="more" onclick="toggleIt('allText')">only the first paragraph of text is shown below - click here for the rest...</div>
        <div class="firstparagraph"> {first} </div>
        <div class="allText" id="allText"> {text} </div>
        <div class="title" id="propertyTitle" onclick="toggleIt('propertyList')">Properties (click to expand)</div>
        <div id="propertyList" style="display:none;"> {propertyString} </div>
        <div id="eventTitle" class="title" onclick="toggleIt('eventList')">Events (click to expand)</div>
        <div id="eventList" style="display:none;"> {eventString} </div>

    </div>
    <div class="right">right----------</div>
  </div>
  <div class="footer">footer</div>
</div>
</body>


</html>