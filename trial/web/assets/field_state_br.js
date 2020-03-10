class FieldStateBrazil extends HTMLElement {

  constructor() {
      super();

      Ext.create('Ext.data.Store', {
          fields: [ 'name', 'value' ],
          data: [
                  { "value":"AC","name":"Acre" },
                  { "value":"AL","name":"Alagoas" },
                  { "value":"AP","name":"Amapá" },
                  { "value":"AM","name":"Amazonas" },
                  { "value":"BA","name":"Bahia" },
                  { "value":"CE","name":"Ceará" },
                  { "value":"DF","name":"Distrito Federal" },
                  { "value":"ES","name":"Espírito Santo" },
                  { "value":"GO","name":"Goiás" },
                  { "value":"MA","name":"Maranhão" },
                  { "value":"MT","name":"Mato Grosso" },
                  { "value":"MS","name":"Mato Grosso do Sul" },
                  { "value":"MG","name":"Minas Gerais" },
                  { "value":"PA","name":"Pará" },
                  { "value":"PB","name":"Paraíba" },
                  { "value":"PR","name":"Paraná" },
                  { "value":"PE","name":"Pernambuco" },
                  { "value":"PI","name":"Piauí" },
                  { "value":"RJ","name":"Rio de Janeiro" },
                  { "value":"RN","name":"Rio Grande do Norte" },
                  { "value":"RS","name":"Rio Grande do Sul" },
                  { "value":"RO","name":"Rondônia" },
                  { "value":"RR","name":"Rorâima" },
                  { "value":"SC","name":"Santa Catarina" },
                  { "value":"SP","name":"São Paulo" },
                  { "value":"SE","name":"Sergipe" },
                  { "value":"TO","name":"Tocantins" }
          ],
          storeId: 'brStateStore'
      });
  }

  connectedCallback() {
      this.innerHTML = `<ext-comboboxfield
                          placeholder="Select State*"
                          queryMode="local"
                          displayField="name"
                          valueField="value"
                          forceSelection="true"
                          triggerAction="all"
                          required="true"
                          autoFocus="false"
                          store="brStateStore"/>`;

      this._addListeners();
  }

  _addListeners() {

  }

  getValue() {
      let fieldEl = this.querySelector('ext-comboboxfield');
      return fieldEl.cmp.getValue();
  }

}
window.customElements.define('sencha-field-state-br', FieldStateBrazil);