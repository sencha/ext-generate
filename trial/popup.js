//import "@sencha/ext-web-components-modern/ext-runtime-modern/modern.engine.enterprise"

(function(){

window.popup = {}
window.popup.button = null
window.popup.panel = null
window.popup.tooltip = null

window.addEventListener('DOMContentLoaded', (event) => {
    //createHTTPRequestStyle();
    //createCSSLink();
    createCSSScript();
    popup.button = doButton()
    popup.panel = doPanel()
    popup.tooltip = doTooltip()

    //dragElement(popup.panel);
});

function doButton() {
  var element = document.createElement('DIV');
  element.setAttribute('class', 'button buttonhide')
  element.innerHTML = '';
  element.addEventListener('click', function(){
    toggle(popup.panel);
  });
  element.addEventListener("mouseover", function(event) {
    //console.log('mouseover')
    //console.log(event)
    popup.tooltip.classList.remove('hide')
    popup.tooltip.classList.add('show');
  }, false);
  element.addEventListener("mouseout", function(event) {
    //console.log('mouseout')
    //console.log(event)
    popup.tooltip.classList.remove('show')
    popup.tooltip.classList.add('hide');
  }, false);
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(element);
  return element;
}

function doPanel() {
  var element = document.createElement('DIV');
  element.setAttribute('class', 'panel hide')
  //element.innerHTML = 'panel';
  //element.appendChild(doHeader())
  //element.appendChild(doExtButton())
  element.appendChild(doExtPanel())

  element.addEventListener('click', function(){
    //btn.innerHTML = 'Hello World';
  });
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(element);
  return element
}

function doTooltip() {
  var element = document.createElement('DIV');
  element.setAttribute('class', 'tooltippopup hide')
  element.innerHTML = 'Click here<br>To Get Help from Sencha';
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(element);
  return element
}

function doHeader() {
  var element = document.createElement('DIV');
  element.setAttribute('class', 'header')
  element.innerHTML = 'Sencha Chat';
  return element;
}

function doExtButton() {
  var element = document.createElement('EXT-BUTTON');
  //console.log(element)
  element.setAttribute('text', 'ext-button here')
  element.setAttribute('shadow', 'true')
  return element;
}

function doExtPanel() {
  var element = document.createElement('PANEL-COMPONENT');
  //console.log(element)
  return element;
}






})();

function createCSSScript() {
  var s =
  `

.mebubble {
  padding: 10px 10px 10px 10px;
  background: #30839e;
  color: white;
  border: 0px black solid;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0 gray;
  margin: 10px 10px 10px 10px;
  width: 80%;
  float: right;

}

.thembubble {
  padding: 10px 10px 10px 10px;
  background: yellow;
  color: black;
  border: 0px black solid;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0 gray;
  margin: 10px 10px 10px 10px;
  width: 80%;
  float: left;
}

.buttonshow {
  background-image: url(assets/logoClose.png);
}

.buttonhide {
  background-image: url(assets/logoOpen.png);
}

.button {

  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 90px;


  box-shadow: 2px 2px 8px 0 gray;

  z-index: 10;
  bottom: 50px;
  left: 50px;
  position: absolute;
  xbackground: blue;
  color: white;
  padding: 10px 10px 10px 10px;
  background-position: 50% center;
  border-radius: 50%;
  height: 50px;
  width: 50px;



  xbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAFoCAYAAADttMYPAAAKL2lDQ…F6PcmrpZRta0mwYJmiVdLOx/qN+lvvpX0sjCEgAAAArK//B9Dn7q/xQEZjAAAAAElFTkSuQmCC);

  xbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAATlBMV…ddXTzEw67G43/k0bpv6+nqnac7P3zd1d+mJl+CvrYmL3WfP5rdGLokt1OvAAAAAElFTkSuQmCC) !important;
  xbackground-size: 20px !important;


}

.tooltippopup {
  z-index: 10;
  bottom: 110px;
  left: 110px;
  text-align: center;
  position: absolute;
  background: black;
  color: white;
  height: 50px;
  width: 200px;
  border: 0px black solid;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0 gray;

}

.panel {
  xcursor: pointer;
  z-index: 10;
  bottom: 160px;
  left: 160px;
  position: absolute;
  background: grey;
  color: black;
  xpadding: 10px 10px 10px 10px;
  height: 500px;
  width: 300px;
  border: 0px black solid;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0 gray;
  animation: slide-up 0.4s ease;
}

.header {
  background-image:linear-gradient(rgb(245, 134, 31) 0%, rgb(238, 92, 13) 100%);
  xbackground: blue;
  color: white;
  padding: 10px 10px 10px 10px;
  text-align: center;
}


@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.show {
  display: block;
}

.hide {
  display: none;
}


  `
  var head = document.getElementsByTagName('HEAD')[0];
  var style = document.createElement('style');
  style.innerHTML = s;
  head.appendChild(style);
}

function setAttributes(btn) {

  //   #si-wrapper .silc-btn-button {
  //     background-position: 50% center;
  //     bottom: 0;
  //     right: 0;
  //     cursor: pointer;
  //     background-repeat: no-repeat;
  //     background-size: 27px;
  //     border-radius: 50%;
  //     height: 55px;
  //     width: 55px;
  //     position: absolute;
  // }

  btn.style.zIndex = "10";
  btn.style.bottom = "50px";
  btn.style.left = "50px";
  btn.style.position = "absolute";
  btn.style.background = "blue";
  //btn.style.color = "white";
  btn.style.padding = "10px 10px 10px 10px";
  btn.style.backgroundPosition = "50% center";
  btn.style.borderRadius = "50%";
  btn.style.height = "100px";
  btn.style.width = "100px";
}

function createHTTPRequestStyle() {
  var xhrLink = new XMLHttpRequest();
  xhrLink.open('GET', `popup.css`, false);
  xhrLink.send('');
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = xhrLink.responseText;
  console.log(style)
  document.getElementsByTagName('head')[0].appendChild(style);
}

function createCSSLink() {
  var head = document.getElementsByTagName('HEAD')[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'popup.css';
  head.appendChild(link);
}

function show(elem) {
  //popup.button.innerHTML = 'hide';
  popup.button.classList.remove('buttonhide')
  popup.button.classList.add('buttonshow');
  elem.classList.remove('hide')
  elem.classList.add('show');
}

function hide(elem) {
  //popup.button.innerHTML = 'show';
  popup.button.classList.remove('buttonshow')
  popup.button.classList.add('buttonhide');
  elem.classList.remove('show')
  elem.classList.add('hide');
}

function toggle(elem, timing) {
  if (elem.classList.contains('show')) {
    hide(elem);
  }
  else {
    show(elem);
  }
};



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    //console.dir(elmnt)
    var elmntP = elmnt.parentNode.parentNode.parentNode
    elmntP.style.top = (elmntP.offsetTop - pos2) + "px";
    elmntP.style.left = (elmntP.offsetLeft - pos1) + "px";


    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}