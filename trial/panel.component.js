class PanelComponent extends HTMLElement {

getTemplate(me) {


var template = `

<ext-panel title='Sencha Help Chat' fitToParent layout='vbox' id='panel-component-root' extname='root'>
  <ext-dataview
    extname="dataview"
    height="300"
    rowLines="true"
  />
  </ext-dataview>



  <ext-formpanel>
  <ext-fieldset>






    <ext-textfield
        extname="first"
        id="myget_first"
        label="First Name"
        required="true"
        placeholder="Enter your first name">
        </ext-textfield>

        <ext-textfield
        extname="message"
        id="myget_last"
        label="Message"
        required="true"
        placeholder="Enter your message">
        </ext-textfield>
    <ext-button
        id="myget_start"
        text="Send Message"
        ui=""
        shadow="true"
        iconCls=""
        arrowAlign="bottom">
      </ext-button>
</ext-fieldset>
</ext-formpanel>

</ext-panel>

`;
return template
}

    constructor() {
      super()
      console.log('constructor')
    }


    connectedCallback() {
      console.log('panel-component')
        this.innerHTML = this.getTemplate(this);
        this._addListeners();
    }

    _addListeners() {


      
        let buttonStartTrialEl = this.querySelector('ext-button');
        buttonStartTrialEl.addEventListener('tap', (event) => {
          this.dataview.getStore().add({who: 'thembubble', name: this.first.getValue(), text: this.message.getValue()})
          var scroller = this.dataview.getScrollable();
          scroller.scrollTo(Infinity, Infinity);
        });


        let panelTrialEl = this.querySelector('#panel-component-root');
        panelTrialEl.addEventListener('ready', (event) => {
          console.log('ready')
          console.log(event)
          var r = event.detail.cmpObj['root'];
          var h = r.getHeader()
          dragElement(h.el.dom);
          console.log(r.getHeader())


      this.dataview = event.detail.cmpObj['dataview']
      this.first = event.detail.cmpObj['first']
      this.message = event.detail.cmpObj['message']

      var store = [
        { who: 'mebubble', name: 'Marc', text: 'what can I do for you?' },
        { who: 'mebubble', name: 'Marc', text: 'did you get your credentials?' },
        { who: 'thembubble', name: 'Egon', text: 'yes I did, just logging in' },
        { who: 'mebubble', name: 'Marc', text: 'great, let me know how it goes' }
    ]

    var itemTpl= '<div class="{who}"><div>{name}</div><div>{text}</div></div>'

    this.dataview.setItemTpl(itemTpl)
    this.dataview.setStore(store)



      //     var list = event.detail.cmpObj['list'];
      //     const tpl =
      //     `<div>
      //         <div style="font-size:16px;margin-bottom:5px;">{first_name} {last_name}</div>
      //         <div style="font-size:12px;color:#666;">{title}</div>
      //     </div>`;

      //     var itemTpl='<div class="contact">{firstName} <b>{lastName}</b></div>'
      //     var store={
      //       "autoLoad": true,
      //         "data": [{
      //             "firstName": "Peter",
      //             "lastName": "Venkman"
      //         }]
      //       }





      // this.store = Ext.create('Ext.data.Store', {
      //     autoLoad: true,
      //     proxy: {
      //         type: 'rest',
      //         url: 'resources/data/people.json'
      //     },
      //     sorters: ['last_name', 'first_name']
      // });

      // this.listCmp.setItemTpl(tpl);
      // this.listCmp.setStore(this.store);


        });

    }



}
window.customElements.define('panel-component', PanelComponent);
