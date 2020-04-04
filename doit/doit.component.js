


//import './doit.component.js';
//import './modern.engine.pro.debug.js';
import './ext-all-debug.js';
//import {Ext2} from './Ext2.js'

//import  './Ext2ScriptTag.js'
//import  './Ext2.js'
//with (window){


  // (function(document, global) {

 //    import.call(window,'./ext-all-debug.js')

  // }).call(window, document, window)


//}






class DoItComponent extends HTMLElement {

  getTemplate() {
    var template = `
    <div>${window.Ext}</div>
`;
return template;
  }

  connectedCallback() {
    const s = document.createElement('script')
    s.src = './ext-all-debug.js';
    s.type = 'text/javascript';
    s.async = false;
    document.getElementsByTagName('head')[0].appendChild(s);




console.log(Ext)
    this.innerHTML = this.getTemplate()
    this._addListeners();
  }

  _addListeners() {
    // this.querySelector('#panel-component-root').addEventListener('ready', (event) => {
    //   this.onPageReady(event)
    // });
    // this.querySelector('#myget_button').addEventListener('tap', (event) => {
    //   this.onButtonTap(event)
    // });
  }

  // onPageReady(event) {
  //   for (var prop in event.detail.cmpObj) {
  //     this[prop] = event.detail.cmpObj[prop];
  //   }

  //   var h = this.root.getHeader();
  //   dragElement(h.el.dom);

  //   var itemTpl= '<div class="{who}"><div>{name}</div><div>{text}</div></div>';
  //   var store = [
  //     { who: 'mebubble', name: 'Marc', text: 'what can I do for you?' },
  //     { who: 'mebubble', name: 'Marc', text: 'did you get your credentials?' },
  //     { who: 'thembubble', name: 'Egon', text: 'yes I did, just logging in' },
  //     { who: 'mebubble', name: 'Marc', text: 'great, let me know how it goes' }
  //   ];
  //   this.dataview.setItemTpl(itemTpl);
  //   this.dataview.setStore(store);
  // }

  // onButtonTap(event) {
  //   this.dataview.getStore().add({who: 'thembubble', name: this.first.getValue(), text: this.message.getValue()})
  //   var scroller = this.dataview.getScrollable();
  //   scroller.scrollTo(Infinity, Infinity);
  // }
}
window.customElements.define('doit-component', DoItComponent);

