import Ext_DatePicker from './Ext/DatePicker.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCDatepicker extends Ext_DatePicker {
  constructor() {
    super ([], []);
    this.xtype = 'datepicker';
  }
}
try {
  window.customElements.define('ext-datepicker', ElementParser.withParsedCallback(EWCDatepicker));
}
catch(e) {
  window.customElements.define('ext-datepicker', EWCDatepicker);
}
