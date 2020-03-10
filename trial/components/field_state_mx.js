class FieldStateMexico extends HTMLElement {

  constructor() {
      super();

      Ext.create('Ext.data.Store', {
          fields: [ 'name', 'value' ],
          data: [
              { "value":"AG","name":"Aguascalientes" },
              { "value":"BC","name":"Baja California" },
              { "value":"BS","name":"Baja California Sur" },
              { "value":"CM","name":"Campeche" },
              { "value":"CS","name":"Chiapas" },
              { "value":"CH","name":"Chihuahua" },
              { "value":"CO","name":"Coahuila" },
              { "value":"CL","name":"Colima" },
              { "value":"DF","name":"Distrito Federal" },
              { "value":"DG","name":"Durango" },
              { "value":"GT","name":"Guanajuanto" },
              { "value":"GR","name":"Guerrero" },
              { "value":"HG","name":"Hidalgo" },
              { "value":"JA","name":"Jalisco" },
              { "value":"MX","name":"Mexico" },
              { "value":"MI","name":"Michoacan" },
              { "value":"MO","name":"Morelos" },
              { "value":"NA","name":"Nayarit" },
              { "value":"NL","name":"Nuevo Leon" },
              { "value":"OA","name":"Oaxaca" },
              { "value":"PU","name":"Puebla" },
              { "value":"QT","name":"Queretaro" },
              { "value":"QR","name":"Quintana Roo" },
              { "value":"SL","name":"San Luis Potosi" },
              { "value":"SI","name":"Sinaloa" },
              { "value":"SO","name":"Sonora" },
              { "value":"TB","name":"Tabasco" },
              { "value":"TM","name":"Tamaulipas" },
              { "value":"TL","name":"Tlaxcala" },
              { "value":"VE","name":"Veracruz" },
              { "value":"YU","name":"Yucatan" },
              { "value":"ZA","name":"Zacatecas" }
          ],
          storeId: 'mxStateStore'
      });
  }

  connectedCallback() {
      this.innerHTML = `<ext-comboboxfield
                          label="State of Mexico"
                          queryMode="local"
                          displayField="name"
                          valueField="value"
                          forceSelection="true"
                          triggerAction="all"
                          required="true"
                          requiredMessage="Choose your State of Mexico"
                          autoFocus="false"
                          store="mxStateStore"/>`;

      this._addListeners();
  }

  _addListeners() {

  }

  getValue() {
      let fieldEl = this.querySelector('ext-comboboxfield');
      return fieldEl.cmp.getValue();
  }

}
window.customElements.define('sencha-field-state-mx', FieldStateMexico);