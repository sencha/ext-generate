import Ext_form_field_ComboBox from './Ext/form/field/ComboBox.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCComboboxfield extends Ext_form_field_ComboBox {
  constructor() {
    super ([], []);
    this.xtype = 'comboboxfield';
  }
}
try {
  window.customElements.define('ext-comboboxfield', ElementParser.withParsedCallback(EWCComboboxfield));
}
catch(e) {
  window.customElements.define('ext-comboboxfield', EWCComboboxfield);
}
