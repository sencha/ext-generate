import Ext_ux_colorpick_Selector from './Ext/ux/colorpick/Selector.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCColorselector extends Ext_ux_colorpick_Selector {
  constructor() {
    super ([], []);
    this.xtype = 'colorselector';
  }
}
try {
  window.customElements.define('ext-colorselector', ElementParser.withParsedCallback(EWCColorselector));
}
catch(e) {
  window.customElements.define('ext-colorselector', EWCColorselector);
}
