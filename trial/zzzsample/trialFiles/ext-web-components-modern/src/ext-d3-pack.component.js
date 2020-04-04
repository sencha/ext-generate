import Ext_d3_hierarchy_Pack from './Ext/d3/hierarchy/Pack.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCD3_pack extends Ext_d3_hierarchy_Pack {
  constructor() {
    super ([], []);
    this.xtype = 'd3-pack';
  }
}
try {
  window.customElements.define('ext-d3-pack', ElementParser.withParsedCallback(EWCD3_pack));
}
catch(e) {
  window.customElements.define('ext-d3-pack', EWCD3_pack);
}
