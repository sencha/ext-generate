import Ext_grid_cell_Date from './Ext/grid/cell/Date.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCDatecell extends Ext_grid_cell_Date {
  constructor() {
    super ([], []);
    this.xtype = 'datecell';
  }
}
try {
  window.customElements.define('ext-datecell', ElementParser.withParsedCallback(EWCDatecell));
}
catch(e) {
  window.customElements.define('ext-datecell', EWCDatecell);
}
