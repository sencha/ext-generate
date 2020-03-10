class FieldOs extends HTMLElement {

  constructor() {
      super();

      Ext.create('Ext.data.Store', {
          fields: [ 'name', 'value' ],
          data: [
                  { "value":"Windows 32-bit","name":"Windows 32-bit" },
                  { "value":"Windows 64-bit","name":"Windows 64-bit" },
                  { "value":"Linux 32-bit","name":"Linux 32-bit" },
                  { "value":"Linux 64-bit","name":"Linux 64-bit" },
                  { "value":"Mac OS X","name":"Mac OS X" }
          ],
          storeId: 'osStore'
      });
  }

  connectedCallback() {
      this.innerHTML = `<ext-comboboxfield
                          extname="os"
                          label="Operating System"
                          queryMode="local"
                          displayField="name"
                          valueField="value"
                          forceSelection="true"
                          triggerAction="all"
                          required="true"
                          requiredMessage="Choose your Operating System"
                          autoFocus="false"
                          store="osStore"/>`;

      this._addListeners();
  }

  _addListeners() {

  }

  getValue() {
      let fieldEl = this.querySelector('ext-comboboxfield');
      return fieldEl.cmp.getValue();
  }

}
window.customElements.define('sencha-field-os', FieldOs);