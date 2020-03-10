class FieldStateUs extends HTMLElement {

  constructor() {
      super();

      Ext.create('Ext.data.Store', {
          fields: [ 'name', 'value' ],
          data: [
              { "value":"AL","name":"Alabama" },
              { "value":"AK","name":"Alaska" },
              { "value":"AS","name":"American Samoa" },
              { "value":"AZ","name":"Arizona" },
              { "value":"CA","name":"California" },
              { "value":"CO","name":"Colorado" },
              { "value":"CT","name":"Connecticut" },
              { "value":"DE","name":"Delaware" },
              { "value":"DC","name":"District of Columbia" },
              { "value":"FL","name":"Florida" },
              { "value":"GA","name":"Georgia" },
              { "value":"GU","name":"Guam" },
              { "value":"HI","name":"Hawaii" },
              { "value":"ID","name":"Idaho" },
              { "value":"IL","name":"Illinois" },
              { "value":"IN","name":"Indiana" },
              { "value":"IA","name":"Iowa" },
              { "value":"KS","name":"Kansas" },
              { "value":"KY","name":"Kentucky" },
              { "value":"LA","name":"Louisiana" },
              { "value":"ME","name":"Maine" },
              { "value":"MD","name":"Maryland" },
              { "value":"MH","name":"Marshall Islands" },
              { "value":"MA","name":"Massachusetts" },
              { "value":"MI","name":"Michigan" },
              { "value":"MN","name":"Minnesota" },
              { "value":"MS","name":"Mississippi" },
              { "value":"MO","name":"Missouri" },
              { "value":"MT","name":"Montana" },
              { "value":"NE","name":"Nebraska" },
              { "value":"NV","name":"Nevada" },
              { "value":"NH","name":"New Hampshire" },
              { "value":"NJ","name":"New Jersey" },
              { "value":"NM","name":"New Mexico" },
              { "value":"NY","name":"New York" },
              { "value":"NC","name":"North Carolina" },
              { "value":"ND","name":"North Dakota" },
              { "value":"OH","name":"Ohio" },
              { "value":"OK","name":"Oklahoma" },
              { "value":"OR","name":"Oregon" },
              { "value":"PW","name":"Palau" },
              { "value":"PA","name":"Pennsylvania" },
              { "value":"PR","name":"Puerto Rico" },
              { "value":"RI","name":"Rhode Island" },
              { "value":"SC","name":"South Carolina" },
              { "value":"SD","name":"South Dakota" },
              { "value":"TN","name":"Tennessee" },
              { "value":"TX","name":"Texas" },
              { "value":"UT","name":"Utah" },
              { "value":"VT","name":"Vermont" },
              { "value":"VI","name":"Virgin Islands" },
              { "value":"VA","name":"Virginia" },
              { "value":"WA","name":"Washington" },
              { "value":"WV","name":"West Virginia" },
              { "value":"WI","name":"Wisconsin" },
              { "value":"WY","name":"Wyoming" },
              { "value":"AE","name":"Armed Forces AE" },
              { "value":"AP","name":"Armed Forces AP" }
          ],
          storeId: 'usStateStore'
      });
  }

  connectedCallback() {
      this.innerHTML = `<ext-comboboxfield
                          queryMode="local"
                          displayField="name"
                          valueField="value"
                          forceSelection="true"
                          triggerAction="all"
                          required="true"
                          placeholder="Select State*"
                          autoFocus="false"
                          store="usStateStore"/>`;

      this._addListeners();
  }

  _addListeners() {

  }

  getValue() {
      let fieldEl = this.querySelector('ext-comboboxfield');
      return fieldEl.cmp.getValue();
  }

}
window.customElements.define('sencha-field-state-us', FieldStateUs);