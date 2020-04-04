import Ext_field_trigger_SpinUp from './Ext/field/trigger/SpinUp.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCSpinuptrigger extends Ext_field_trigger_SpinUp {
  constructor() {
    super ([], []);
    this.xtype = 'spinuptrigger';
  }
}
try {
  window.customElements.define('ext-spinuptrigger', ElementParser.withParsedCallback(EWCSpinuptrigger));
}
catch(e) {
  window.customElements.define('ext-spinuptrigger', EWCSpinuptrigger);
}
