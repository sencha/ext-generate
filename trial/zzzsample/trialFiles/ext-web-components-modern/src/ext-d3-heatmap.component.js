import Ext_d3_HeatMap from './Ext/d3/HeatMap.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCD3_heatmap extends Ext_d3_HeatMap {
  constructor() {
    super ([], []);
    this.xtype = 'd3-heatmap';
  }
}
try {
  window.customElements.define('ext-d3-heatmap', ElementParser.withParsedCallback(EWCD3_heatmap));
}
catch(e) {
  window.customElements.define('ext-d3-heatmap', EWCD3_heatmap);
}
