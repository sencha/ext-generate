import Ext_TabBar from './Ext/TabBar.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCTabbar extends Ext_TabBar {
  constructor() {
    super ([], []);
    this.xtype = 'tabbar';
  }
}
try {
  window.customElements.define('ext-tabbar', ElementParser.withParsedCallback(EWCTabbar));
}
catch(e) {
  window.customElements.define('ext-tabbar', EWCTabbar);
}
