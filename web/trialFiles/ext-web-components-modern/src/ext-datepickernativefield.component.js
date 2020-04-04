import Ext_form_DatePickerNative from './Ext/form/DatePickerNative.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCDatepickernativefield extends Ext_form_DatePickerNative {
  constructor() {
    super ([], []);
    this.xtype = 'datepickernativefield';
  }
}
try {
  window.customElements.define('ext-datepickernativefield', ElementParser.withParsedCallback(EWCDatepickernativefield));
}
catch(e) {
  window.customElements.define('ext-datepickernativefield', EWCDatepickernativefield);
}
