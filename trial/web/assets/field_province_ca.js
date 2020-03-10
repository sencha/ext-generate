class FieldProvinceCanada extends HTMLElement {

  constructor() {
      super();

      Ext.create('Ext.data.Store', {
          fields: [ 'name', 'value' ],
          data: [
              { "value":"AB","name":"Alberta" },
              { "value":"BC","name":"British Columbia" },
              { "value":"MB","name":"Manitoba" },
              { "value":"NB","name":"New Brunswick" },
              { "value":"NF","name":"Newfoundland" },
              { "value":"NT","name":"Northwest Terr." },
              { "value":"NS","name":"Nova Scotia" },
              { "value":"NU","name":"Nunavut" },
              { "value":"ON","name":"Ontario" },
              { "value":"PE","name":"Prince Edward Island" },
              { "value":"QC","name":"Quebec" },
              { "value":"SK","name":"Saskatchewan" },
              { "value":"YT","name":"Yukon" }
          ],
          storeId: 'caProvinceStore'
      });
  }

  connectedCallback() {
      this.innerHTML = `<ext-comboboxfield
                          placeholder="Select Province*"
                          queryMode="local"
                          displayField="name"
                          valueField="value"
                          forceSelection="true"
                          triggerAction="all"
                          required="true"
                          autoFocus="false"
                          store="caProvinceStore"/>`;

      this._addListeners();
  }

  _addListeners() {

  }

  getValue() {
      let fieldEl = this.querySelector('ext-comboboxfield');
      return fieldEl.cmp.getValue();
  }

}
window.customElements.define('sencha-field-province-ca', FieldProvinceCanada);
