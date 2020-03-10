(function () {
  window.popup = {};
  window.popup.button = null;
  window.popup.panel = null;
  window.popup.tooltip = null;
  window.addEventListener('DOMContentLoaded', function (event) {
    //createHTTPRequestStyle();
    //createCSSLink();
    createCSSScript();
    popup.button = doButton();
    popup.panel = doPanel();
    popup.tooltip = doTooltip(); //dragElement(popup.panel);
  });

  function doButton() {
    var element = document.createElement('DIV');
    element.setAttribute('class', 'button buttonhide');
    element.innerHTML = '';
    element.addEventListener('click', function () {
      toggle(popup.panel);
    });
    element.addEventListener("mouseover", function (event) {
      //console.log('mouseover')
      //console.log(event)
      popup.tooltip.classList.remove('hide');
      popup.tooltip.classList.add('show');
    }, false);
    element.addEventListener("mouseout", function (event) {
      //console.log('mouseout')
      //console.log(event)
      popup.tooltip.classList.remove('show');
      popup.tooltip.classList.add('hide');
    }, false);
    var body = document.getElementsByTagName("BODY")[0];
    body.appendChild(element);
    return element;
  }

  function doPanel() {
    var element = document.createElement('DIV');
    element.setAttribute('class', 'panel hide'); //element.innerHTML = 'panel';
    //element.appendChild(doHeader())
    //element.appendChild(doExtButton())

    element.appendChild(doExtPanel());
    element.addEventListener('click', function () {//btn.innerHTML = 'Hello World';
    });
    var body = document.getElementsByTagName("BODY")[0];
    body.appendChild(element);
    return element;
  }

  function doTooltip() {
    var element = document.createElement('DIV');
    element.setAttribute('class', 'tooltippopup hide');
    element.innerHTML = 'Click here<br>To Get Help from Sencha';
    var body = document.getElementsByTagName("BODY")[0];
    body.appendChild(element);
    return element;
  }

  function doHeader() {
    var element = document.createElement('DIV');
    element.setAttribute('class', 'header');
    element.innerHTML = 'Sencha Chat';
    return element;
  }

  function doExtButton() {
    var element = document.createElement('EXT-BUTTON'); //console.log(element)

    element.setAttribute('text', 'ext-button here');
    element.setAttribute('shadow', 'true');
    return element;
  }

  function doExtPanel() {
    var element = document.createElement('PANEL-COMPONENT'); //console.log(element)

    return element;
  }
})();

function createCSSScript() {
  var s = "\n\n.mebubble {\n  padding: 10px 10px 10px 10px;\n  background: #30839e;\n  color: white;\n  border: 0px black solid;\n  border-radius: 3px;\n  box-shadow: 2px 2px 8px 0 gray;\n  margin: 10px 10px 10px 10px;\n  width: 80%;\n  float: right;\n\n}\n\n.thembubble {\n  padding: 10px 10px 10px 10px;\n  background: yellow;\n  color: black;\n  border: 0px black solid;\n  border-radius: 3px;\n  box-shadow: 2px 2px 8px 0 gray;\n  margin: 10px 10px 10px 10px;\n  width: 80%;\n  float: left;\n}\n\n.buttonshow {\n  background-image: url(assets/logoClose.png);\n}\n\n.buttonhide {\n  background-image: url(assets/logoOpen.png);\n}\n\n.button {\n\n  cursor: pointer;\n  background-repeat: no-repeat;\n  background-size: 90px;\n\n\n  box-shadow: 2px 2px 8px 0 gray;\n\n  z-index: 10;\n  bottom: 50px;\n  left: 50px;\n  position: absolute;\n  xbackground: blue;\n  color: white;\n  padding: 10px 10px 10px 10px;\n  background-position: 50% center;\n  border-radius: 50%;\n  height: 50px;\n  width: 50px;\n\n\n\n  xbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAFoCAYAAADttMYPAAAKL2lDQ\u2026F6PcmrpZRta0mwYJmiVdLOx/qN+lvvpX0sjCEgAAAArK//B9Dn7q/xQEZjAAAAAElFTkSuQmCC);\n\n  xbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAATlBMV\u2026ddXTzEw67G43/k0bpv6+nqnac7P3zd1d+mJl+CvrYmL3WfP5rdGLokt1OvAAAAAElFTkSuQmCC) !important;\n  xbackground-size: 20px !important;\n\n\n}\n\n.tooltippopup {\n  z-index: 10;\n  bottom: 110px;\n  left: 110px;\n  text-align: center;\n  position: absolute;\n  background: black;\n  color: white;\n  height: 50px;\n  width: 200px;\n  border: 0px black solid;\n  border-radius: 3px;\n  box-shadow: 2px 2px 8px 0 gray;\n\n}\n\n.panel {\n  xcursor: pointer;\n  z-index: 10;\n  bottom: 160px;\n  left: 160px;\n  position: absolute;\n  background: grey;\n  color: black;\n  xpadding: 10px 10px 10px 10px;\n  height: 500px;\n  width: 300px;\n  border: 0px black solid;\n  border-radius: 3px;\n  box-shadow: 2px 2px 8px 0 gray;\n  animation: slide-up 0.4s ease;\n}\n\n.header {\n  background-image:linear-gradient(rgb(245, 134, 31) 0%, rgb(238, 92, 13) 100%);\n  xbackground: blue;\n  color: white;\n  padding: 10px 10px 10px 10px;\n  text-align: center;\n}\n\n\n@keyframes slide-up {\n  0% {\n    opacity: 0;\n    transform: translateY(100px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.show {\n  display: block;\n}\n\n.hide {\n  display: none;\n}\n\n\n  ";
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
  btn.style.background = "blue"; //btn.style.color = "white";

  btn.style.padding = "10px 10px 10px 10px";
  btn.style.backgroundPosition = "50% center";
  btn.style.borderRadius = "50%";
  btn.style.height = "100px";
  btn.style.width = "100px";
}

function createHTTPRequestStyle() {
  var xhrLink = new XMLHttpRequest();
  xhrLink.open('GET', "popup.css", false);
  xhrLink.send('');
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = xhrLink.responseText;
  console.log(style);
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
  popup.button.classList.remove('buttonhide');
  popup.button.classList.add('buttonshow');
  elem.classList.remove('hide');
  elem.classList.add('show');
}

function hide(elem) {
  //popup.button.innerHTML = 'show';
  popup.button.classList.remove('buttonshow');
  popup.button.classList.add('buttonhide');
  elem.classList.remove('show');
  elem.classList.add('hide');
}

function toggle(elem, timing) {
  if (elem.classList.contains('show')) {
    hide(elem);
  } else {
    show(elem);
  }
}

;

function dragElement(elmnt) {
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:
    //console.dir(elmnt)

    var elmntP = elmnt.parentNode.parentNode.parentNode;
    elmntP.style.top = elmntP.offsetTop - pos2 + "px";
    elmntP.style.left = elmntP.offsetLeft - pos1 + "px"; // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}