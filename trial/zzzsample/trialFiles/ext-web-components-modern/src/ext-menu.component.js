import Ext_menu_Menu from './Ext/menu/Menu.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCMenu extends Ext_menu_Menu {
  constructor() {
    super ([], []);
    this.xtype = 'menu';
  }
}
try {
  window.customElements.define('ext-menu', ElementParser.withParsedCallback(EWCMenu));
}
catch(e) {
  window.customElements.define('ext-menu', EWCMenu);
}
