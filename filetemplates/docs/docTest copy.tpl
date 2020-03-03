<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
</head>
<style>

html body {
  font-family: Arial;
  font-size: 28px;
  background: blue;
  margin: 0;
  width:100%;
  height:100%;
}

.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;

    display: flex;
  flex-direction: row;
}



.flexbox-parent
{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */

    background: rgba(255, 255, 255, .1);
}


.root {
  font-family: Arial;
  font-size: 28px;
  background: red;
  display: flex;
  flex-direction: row;
    justify-content: flex-start; /* align items in Main Axis */
    align-items: stretch; /* align items in Cross Axis */
    align-content: stretch; /* Extra space in Cross Axis */
}

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
<body class="Site">
<div>header</div>

<div class="Site-content">

<div class="left">
  <div id="title" class="heading"> {title} </div>
  <div class="more" onclick="toggleIt('allText')">only the first paragraph of text is shown below - click here for the rest...</div>
  <div class="firstparagraph"> {first} </div>
  <div class="allText" id="allText"> {text} </div>
  <div class="title" id="propertyTitle" onclick="toggleIt('propertyList')">Properties (click to expand)</div>
  <div id="propertyList" style="display:none;"> {propertyString} </div>
  <div id="eventTitle" class="title" onclick="toggleIt('eventList')">Events (click to expand)</div>
  <div id="eventList" style="display:none;"> {eventString} </div>
</div>
<div class="right">
right
</div>

</div>
<div>footer</div>
</body>
</html>