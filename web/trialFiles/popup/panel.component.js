class PanelComponent extends HTMLElement {

  getTemplate() {
    var template = `
    <ext-panel title='Sencha Help Chat' fitToParent layout='vbox' id='panel-component-root' extname='root'>
      <ext-dataview extname="dataview" height="300"/></ext-dataview>
      <ext-formpanel>
        <ext-fieldset>
          <ext-textfield
              extname="first"
              required="true"
              placeholder="first name">
          </ext-textfield>
          <ext-textfield
              extname="message"
              required="true"
              placeholder="message">
          </ext-textfield>
          <ext-button
              extname="button"
              id="myget_button"
              text="Send Message"
              ui=""
              shadow="true"
              iconCls=""
              arrowAlign="bottom">
          </ext-button>
        </ext-fieldset>
      </ext-formpanel>
    </ext-panel>
`;
return template;
  }

  connectedCallback() {
    this.innerHTML = this.getTemplate()
    this._addListeners();
  }

  _addListeners() {
    this.querySelector('#panel-component-root').addEventListener('ready', (event) => {
      this.onPageReady(event)
    });
    this.querySelector('#myget_button').addEventListener('tap', (event) => {
      this.onButtonTap(event)
    });
  }

  onPageReady(event) {
    for (var prop in event.detail.cmpObj) {
      this[prop] = event.detail.cmpObj[prop];
    }

    var h = this.root.getHeader();
    dragElement(h.el.dom);

    var itemTpl= '<div class="{who}"><div>{name}</div><div>{text}</div></div>';
    var store = [
      { who: 'mebubble', name: 'Marc', text: 'Hi, this is Marc, the architect for ExtReact' },
      { who: 'mebubble', name: 'Marc', text: 'I am happy to answer any questions about our trial' },
      //{ who: 'mebubble', name: 'Marc', text: 'Who am I chatting with?' },
      // { who: 'thembubble', name: 'Egon', text: 'yes I did, just logging in' },
      // { who: 'mebubble', name: 'Marc', text: 'great, let me know how it goes' }
    ];
    this.dataview.setItemTpl(itemTpl);
    this.dataview.setStore(store);
  }

  onButtonTap(event) {
    this.dataview.getStore().add({who: 'thembubble', name: this.first.getValue(), text: this.message.getValue()})
    var scroller = this.dataview.getScrollable();
    scroller.scrollTo(Infinity, Infinity);
  }
}
window.customElements.define('panel-component', PanelComponent);


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
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    var elmntP = elmnt.parentNode.parentNode.parentNode
    elmntP.style.top = (elmntP.offsetTop - pos2) + "px";
    elmntP.style.left = (elmntP.offsetLeft - pos1) + "px";
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}