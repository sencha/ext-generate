import './classic.engine.enterprise.import.js';
import './materialsmall/classic.material.js';
class DoItComponent extends HTMLElement {
  connectedCallback() {
    Ext.create({
      xtype: 'button',
      text: 'doit',
      renderTo: this.parentNode
    })
  }
}
window.customElements.define('doit-component', DoItComponent);

