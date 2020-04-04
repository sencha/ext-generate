import Ext_form_Slider from './Ext/form/Slider.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCSliderfield extends Ext_form_Slider {
  constructor() {
    super ([], []);
    this.xtype = 'sliderfield';
  }
}
try {
  window.customElements.define('ext-sliderfield', ElementParser.withParsedCallback(EWCSliderfield));
}
catch(e) {
  window.customElements.define('ext-sliderfield', EWCSliderfield);
}
