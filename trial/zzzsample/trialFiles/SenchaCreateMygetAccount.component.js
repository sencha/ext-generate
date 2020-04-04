  import {
    osStore,
    usCountryStore,
    usStateStore,
    caProvinceStore,
    mxStateStore,
    brStateStore
  } from "./stores.js"
class SenchaCreateMygetAccount extends HTMLElement {
  feed = "trial";
  //product = "extjs";
  product = 'ExtReact';
  start = null;
  end = null;
  //quickstartWidth = "960";
  quickstartHeight = "900";

  template = `
  <ext-container>
  <ext-formpanel width="285" height="450" extname="formpanel" ref='step1' layout='{"type": "vbox", "align": "stretch"}' id='sencha-create-myget-account-root'>
    <ext-fieldset defaults='{"labelAlign": "placeholder", "errorTarget": "under"}'>
      <ext-textfield  errorTarget="side" name="first" extname="first" required="true" placeholder="Enter your first name" ></ext-textfield>
      <ext-textfield  errorTarget="side" name="last" extname="last"  required="true" placeholder="Enter your last name" ></ext-textfield>
      <ext-textfield  errorTarget="side" name="company" extname="company"  required="true" placeholder="Enter your company" ></ext-textfield>
      <ext-emailfield errorTarget="under" name="email" extname="email" required="true" placeholder="Enter email - format is me@sencha.com" validators="email"></ext-emailfield>
      <ext-comboboxfield errorTarget="side" name="os" store="osStore" placeholder="Choose your Operating System" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield errorTarget="side" id="country" name="country" store="usCountryStore" placeholder="Choose your Country" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield errorTarget="side" hidden="true" extname="usstate" name="usstate" store="usStateStore" placeholder="Choose your US State" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield errorTarget="side" hidden="true" extname="caprovince" name="caprovince" store="caProvinceStore" placeholder="Choose your CA Province" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield errorTarget="side" hidden="true" extname="mxstate" name="mxstate" store="mxStateStore" placeholder="Choose your MX State" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-comboboxfield errorTarget="side" hidden="true" extname="brstate" name="brstate" store="brStateStore" placeholder="Choose your BR State" displayField="text" valueField="text" required="true"></ext-comboboxfield>
      <ext-checkbox errorTarget="side" name="agreesla" id="myget_agree_sla" xrequired="true" labelWrap="true"boxlabel="I agree to terms of the <a href='https://www.sencha.com/legal/sencha-software-license-agreement/' target='_blank'>software license agreement</a>."></ext-checkbox>
      <ext-button id="myget_start" text="Start Trial" margin="5" width="95%" shadow="true"></ext-button>
      <ext-label style="padding-top:10px;color:darkred;font-size:24px;" extname="errors"></ext-label>
    </ext-fieldset>
    <ext-loadmask extname="mask" id='myget_mask' hidden="true" message='Starting...'/>
  </ext-formpanel>
  <ext-container scrollable="true" hidden="true" extname="quickstart" html="quickstart"></ext-container>
  </ext-container>

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

  // doToast(str) {
  //   if (this.toast == null) {
  //     this.toast = Ext.create('Ext.Toast', {
  //       xwidth: '100%',
  //       cls: 'message',
  //       centered: true,
  //       side: 'bottom',
  //     })
  //   }
  //   this.toast.showToast({
  //     message: '<div class="message"><br>Copied the following to the clipboard:<br><br><b>' + str + '</b><br><br>paste into terminal/console window<br><br></div>',
  //     timeout: 5000
  //   })
  // }

  _addListeners() {
    this.querySelector('#sencha-create-myget-account-root').addEventListener('ready', (event) => {
      this.onPageReady(event)
    });

    this.querySelector('#myget_start').addEventListener('tap', (event) => {
      this.onStartTap(event)
    });

    this.querySelector('#country').addEventListener('change', (event) => {
      this.countryChanged(event)
    });
  }

  onPageReady(event) {
    for (var prop in event.detail.cmpObj) {
      this[prop] = event.detail.cmpObj[prop];
    }
  }

  onStartTap(event) {
    if (!this.formpanel.validate()) {
      this.errors.setHtml('Form Errors')
      return
    }

    this.formpanel.setMasked(true)
    this.start = new Date();
    var values = this.formpanel.getValues({nameless: false})
    let data = {
      first: values.first,
      last: values.last,
      company: values.company,
      email: values.email,
      title: values.title ? values.title : '',
      phone: values.phone ? values.phone : '',
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


          var callout = document.getElementsByClassName("dlTrialFormCallout")[0];
          callout.innerHTML = `Start your ${this.product} trial now!`


          var req = document.getElementsByClassName("dlTrialFormRequired")[0];
          req.parentNode.removeChild(req);
          var txt = document.getElementsByClassName("dlTrialTXT")[0];
          txt.parentNode.removeChild(txt);
          var formstyling = document.getElementsByClassName("dlFormStyling")[0];
          formstyling.classList.add('dlFormStylingNew');
          formstyling.classList.remove('dlFormStyling')
          var formbox = document.getElementsByClassName("dlTrialFormBox")[0];
          formbox.classList.add('dlTrialFormBoxNew');
          formbox.classList.remove('dlTrialFormBox')

                    //document.getElementById("mygetroot").style.width = this.quickstartWidth+"px";
          //document.getElementById("mygetroot").style.height = this.quickstartHeight+"px";

          //this.quickstart.setWidth(this.quickstartWidth)
          //this.quickstart.setHeight(this.quickstartHeight)
          this.quickstart.setHidden(false)
          this.formpanel.setMasked(false)
          this.formpanel.setHidden(true)
          this.end = new Date();
          var dataForTemplate = this.processResponseData(serverResponse.responseData);
          fetch(`trialFiles/myget/templates/QUICKSTART${this.product.toUpperCase()}.md.tpl.js`)
          .then((response2) => {
            return response2.text()
          })
          .then((quickStartText) => {
            var t = this.writeTemplateFile(quickStartText, dataForTemplate)
            var converter = new showdown.Converter()
            var result = converter.makeHtml(t);
            this.quickstart.setHtml(result)
          });
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

  processResponseData(responseData) {
    responseData.email = this.email.getValue();
    responseData.feed = this.feed;
    responseData.product = this.product;
    responseData.start = this.start;
    responseData.end = this.end;
    responseData.diff = this.end-this.start + ' milliseconds';
    console.log('data from the server - for the template')
    console.log(responseData)
    return responseData;
  }

  writeTemplateFile (inData, vars) {
    var tpl = new Ext.XTemplate(inData);
    var t = tpl.apply(vars);
    return t
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


window['copyToClipboard'] = function(str) {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
  Ext.Msg.alert('Clipboard', '<div class="message"><br>Copied the following to the clipboard:<br><br><b>' + str + '</b><br><br>paste into terminal/console window<br><br></div>');
};