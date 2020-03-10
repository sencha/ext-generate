  import {
    osStore,
    usCountryStore,
    usStateStore,
    caProvinceStore,
    mxStateStore,
    brStateStore
  } from "./util.js"

class SenchaCreateMygetAccount extends HTMLElement {
  feed = "trial";
  product = "extjs";

  template = `
  <ext-formpanel extname="formpanel" ref='step1' layout='{"type": "vbox", "align": "stretch"}' id='sencha-create-myget-account-root' extname='root'>
    <ext-fieldset defaults='{"labelAlign": "placeholder"}'>
      <ext-textfield  name="first" extname="first" required="true" placeholder="Enter your first name" ></ext-textfield>
      <ext-textfield  name="last" extname="last"  required="true" placeholder="Enter your last name" ></ext-textfield>
      <ext-textfield  name="company" extname="company"  required="true" placeholder="Enter your company" ></ext-textfield>
      <ext-emailfield name="email" extname="email" required="true" placeholder="Enter email - format is me@sencha.com" validators="email"></ext-emailfield>

      <ext-comboboxfield name="os" store="osStore" placeholder="Choose your Operating System" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield id="country" name="country" store="usCountryStore" placeholder="Choose your Country" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield hidden="true" extname="usstate" name="usstate" store="usStateStore" placeholder="Choose your US State" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield hidden="true" extname="caprovince" name="caprovince" store="caProvinceStore" placeholder="Choose your CA Province" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield hidden="true" extname="mxstate" name="mxstate" store="mxStateStore" placeholder="Choose your MX State" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield hidden="true" extname="brstate" name="brstate" store="brStateStore" placeholder="Choose your BR State" displayField="text" valueField="text" required="true"></ext-comboboxfield>

      <ext-checkbox name="agreesla" id="myget_agree_sla" required="true" labelWrap="true"boxlabel="I agree to terms of the <a href='https://www.sencha.com/legal/sencha-software-license-agreement/' target='_blank'>software license agreement</a>."></ext-checkbox>

      <ext-button id="myget_start" text="Start Trial" margin="5" width="95%" shadow="true"></ext-button>
      <ext-label id='myget_errors' html=''></ext-label>
      <ext-loadmask extname="mask" id='myget_mask' hidden="true" message='Starting...'/>
    </ext-fieldset>
  </ext-formpanel>
  `;

  connectedCallback() {
    osStore();
    usCountryStore();
    usStateStore();
    caProvinceStore();
    mxStateStore();
    brStateStore();
    this.innerHTML = this.template
    this._addListeners();
  }

  _addListeners() {
    this.querySelector('#sencha-create-myget-account-root').addEventListener('ready', (event) => {
      this.onPageReady(event)
    });

    this.querySelector('#myget_start').addEventListener('tap', (event) => {
      this.onStartTap(event)
    });

    this.querySelector('#country').addEventListener('change', (event) => {
      //this._updateCountry(event.country);
      this.countryChanged(event)
    }, false);
  }

  onPageReady(event) {
    for (var prop in event.detail.cmpObj) {
      this[prop] = event.detail.cmpObj[prop];
    }
  }

  onStartTap(event) {
    if (!this.formpanel.validate()) {
      Ext.Msg.alert('Form not Valid', 'Please enter all fields on the form');
      return
    }

    var values = this.formpanel.getValues({nameless: false})
    console.log(values)
    this.mask.setHidden(false);
    let data = {
      first: values.first,
      last: values.last,
      company: values.company,
      email: values.email,
      title: values.title,
      phone: values.phone,
      country: values.country ? values.country : '',
      state_us: values.usstate ? values.usstate : '',
      province_ca: values.caprovince ? values.caprovince : '',
      state_mx: values.mxstate ? values.mxstate : '',
      state_br: values.brstate  ? values.brstate : '',
      agree_receive_email: values.agreeemail ? values.agreeemail : false,
      agree_sla: values.agreesla ? values.agreesla : false,
      agree_terms: values.agreeterms ? values.agreeterms : false,
      agree_marketing: values.agreemarketing ? values.agreemarketing : false,
      student: values.agreestudent ? values.agreestudent : false,
      customer: values.agreecustomer? values.agreecustomer : false,
      os: values.os,
      feed: this.feed,
      product: this.product
    };
    console.log('data being sent to the server')
    console.log(data)
    this.postData('https://test-api.sencha.com/v1/myget/', data)
      .then((serverResponse) => {
        console.log(serverResponse)
        if (serverResponse.success == true) {

          Ext.Msg.alert('success', 'sent...');
          // end = new Date();
          // var dataForTemplate = processResponseData(serverResponse.responseData)
          // fetch(`templates/QUICKSTART${product.toUpperCase()}.md.tpl.js`)
          // .then((response2) => {
          //   return response2.text()
          // })
          // .then((quickStartText) => {
          //   var t = writeTemplateFile(quickStartText, dataForTemplate)
          //   var converter = new showdown.Converter()
          //   // https://github.com/showdownjs/showdown/wiki/Emojis
          //   console.log('a')
          //   converter.setOption('emoji', true);
          //   var result = converter.makeHtml(t);

          //   this.quickstart.setHtml(result)
          //   this.mask.setHidden(true);
          //   this.formpanelcontainer.setHidden(true);
          //   this.quickstartpanel.setHidden(false);
          //   this.headingtitle.setHtml(`Follow the ${product} QuickStart Guide`)

          //   this.diff.setHtml(dataForTemplate.diff)
          // });

        }
        else {
          this.mask.setHidden(true);
          Ext.Msg.alert('Error Occurred', `Your credentials were not created.  The server reported: ${response.success}`);
        }
      })
      .catch(error => {
        this.mask.setHidden(true);
        Ext.Msg.alert('Error Occurred', error);
      });
  }

  async postData(url = '', data = {}) {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic aHR0cHdhd0cHdhd0cHdhdGNoOmYNoOmYNoOmY=',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (response.statusText != 'OK') {
      throw new Error('Your credentials were not created.<br><br>The server reported: ' + response.statusText)
    }
    else {
      let result = await response.json();
      return result;
    }
  }

  _processAccountCreation(jsonResponseData) {
      if (jsonResponseData.success) {
          this._processNextSteps(jsonResponseData);
      } else {
          this._processError(jsonResponseData)
      }
  }

  _processNextSteps(jsonResponseData) {
      let username = '<font style="font-weight: bold;">npm username:</font> ' + jsonResponseData.responseData.username;
      let password = '<font style="font-weight: bold;">npm password:</font> ' + jsonResponseData.responseData.password;

      let usernameEl = this.querySelector('#myget_username');
      let passwordEl = this.querySelector('#myget_password');

      usernameEl.cmp.setHtml(username);
      passwordEl.cmp.setHtml(password);

      let step1El = this.querySelector('#myget_step1');
      let step2El = this.querySelector('#myget_step2');
      let step3El = this.querySelector('#myget_step3');
      let step4El = this.querySelector('#myget_step4');
      let step5El = this.querySelector('#myget_step5');
      let step6El = this.querySelector('#myget_step6');

      step1El.cmp.setCollapsible(true);
      step1El.cmp.setCollapsed(true);

      //step1El.style = 'display: none';
      step2El.style = 'display: block';
      step3El.style = 'display: block';
      step4El.style = 'display: block';
      step5El.style = 'display: block';
      step6El.style = 'display: block';

      let errorEl = this.querySelector('#myget_errors');
      errorEl.cmp.setHtml('');
  }

  _processError(jsonResponseData) {
      //debugger;
      let message = jsonResponseData.responseData.errorMessage;

      // extra debugging details
      if (jsonResponseData.responseData.errorFromMyGet) {
          message += "\n<br>";
          message += jsonResponseData.responseData.errorFromMyGet;
      }

      this._displayError(message);
  }

  _displayError(message) {
      let errorEl = this.querySelector('#myget_errors');
      errorEl.cmp.addCls('myget_errors');
      errorEl.cmp.setHtml(message);
  }

  countryChanged(event) {
    var country = event.detail.newValue
    switch(country) {
    case 'UNITED STATES':
      this.usstate.setHidden(false)
      this.caprovince.setHidden(true)
      this.mxstate.setHidden(true)
      this.brstate.setHidden(true)

      this.usstate.setRequired(true)
      this.caprovince.setRequired(false)
      this.mxstate.setRequired(false)
      this.brstate.setRequired(false)
      break;
      case 'CANADA':
      this.usstate.setHidden(true)
      this.caprovince.setHidden(false)
      this.mxstate.setHidden(true)
      this.brstate.setHidden(true)

      this.usstate.setRequired(false)
      this.caprovince.setRequired(true)
      this.mxstate.setRequired(false)
      this.brstate.setRequired(false)
      break;
    case 'BRAZIL':
      this.usstate.setHidden(true)
      this.caprovince.setHidden(true)
      this.mxstate.setHidden(true)
      this.brstate.setHidden(false)

      this.usstate.setRequired(false)
      this.caprovince.setRequired(false)
      this.mxstate.setRequired(false)
      this.brstate.setRequired(true)
      break;
    case 'MEXICO':
      this.usstate.setHidden(true)
      this.caprovince.setHidden(true)
      this.mxstate.setHidden(false)
      this.brstate.setHidden(true)

      this.usstate.setRequired(false)
      this.caprovince.setRequired(false)
      this.mxstate.setRequired(true)
      this.brstate.setRequired(false)
      break;
    default:
      this.usstate.setHidden(true)
      this.caprovince.setHidden(true)
      this.mxstate.setHidden(true)
      this.brstate.setHidden(true)

      this.usstate.setRequired(false)
      this.caprovince.setRequired(false)
      this.mxstate.setRequired(false)
      this.brstate.setRequired(false)
    }
  }

}
window.customElements.define('sencha-create-myget-account', SenchaCreateMygetAccount);
