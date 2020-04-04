import Ext_calendar_view_Multi from './Ext/calendar/view/Multi.js';
import ElementParser from './runtime/ElementParser.js';

export default class EWCCalendar_multiview extends Ext_calendar_view_Multi {
  constructor() {
    super ([], []);
    this.xtype = 'calendar-multiview';
  }
}
try {
  window.customElements.define('ext-calendar-multiview', ElementParser.withParsedCallback(EWCCalendar_multiview));
}
catch(e) {
  window.customElements.define('ext-calendar-multiview', EWCCalendar_multiview);
}
