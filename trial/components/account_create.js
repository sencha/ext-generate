import '@sencha/ext-web-components/dist/ext-button.component';

let template = `
<ext-container
        autoSize="true"
        layout="vbox"
        defaults='{
                    "flex": "1",
                    "shadow": "true",
                    "margin": "10"
                  }'
        flex="1">

    <ext-formpanel
        ref='step1'
        id='myget_step1'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 1 - Sign up for the Free Ext JS Trial"
        shadow="true">

        <ext-fieldset
                defaults='{"labelAlign": "placeholder"}'>

            <ext-label
                html="Complete all the required fields in this form to start your free evaluation.">
                </ext-label>

            <ext-textfield
                id="myget_first"
                label="First Name"
                required="true"
                placeholder="Enter your first name">
                </ext-textfield>

            <ext-textfield
                id="myget_last"
                label="Last Name"
                required="true"
                placeholder="Enter your last name">
                </ext-textfield>

            <ext-textfield
                id="myget_company"
                label="Company"
                required="true"
                placeholder="Enter your company">
                </ext-textfield>

            <ext-emailfield
                id="myget_email"
                label="Email"
                placeholder="me@sencha.com"
                required="true">
                </ext-emailfield>

            <ext-textfield
                id="myget_title"
                label="Title"
                required="true"
                placeholder="Enter your job title">
                </ext-textfield>

            <ext-textfield
                id="myget_phone"
                label="Phone"
                required="true"
                placeholder="Enter contact phone number">
                </ext-textfield>

            <sencha-field-country
                id="myget_country"></sencha-field-country>

            <sencha-field-state-us
                id="myget_state_us"
                style="display: none;"></sencha-field-state-us>

            <sencha-field-province-ca
                id="myget_province_ca"
                style="display: none;"></sencha-field-province-ca>

            <sencha-field-state-mx
                id="myget_state_mx"
                style="display: none;"></sencha-field-state-mx>

            <sencha-field-state-br
                id="myget_state_br"
                style="display: none;"></sencha-field-state-br>

            <sencha-field-os
                id="myget_os"></sencha-field-os>

            <div>&nbsp;</div>

            <ext-formpanel
                layout='{"type": "vbox", "align": "left"}'>
                <ext-checkbox
                    id="myget_agree_receive_email"
                    labelWrap="true"
                    boxlabel="I agree to receive e-mail notifications. See our <a href='https://www.sencha.com/legal/privacy/' target='_blank'>privacy statement</a> for more details."
                    required="true">
                    </ext-checkbox>
                <ext-checkbox
                    id="myget_agree_sla"
                    labelWrap="true"
                    boxlabel="I agree to terms of the <a href='https://www.sencha.com/legal/sencha-software-license-agreement/' target='_blank'>software license agreement</a>."
                    required="true">
                    </ext-checkbox>
                <ext-checkbox
                    id="myget_agree_terms"
                    labelWrap="true"
                    boxlabel="I have read, understand and agree to Idera’s <a href='https://www.sencha.com/legal/terms-of-use/' target='_blank'>terms and conditions</a> and <a href='https://www.sencha.com/legal/privacy/' target='_blank'>privacy statement</a>."
                    required="true">
                    </ext-checkbox>
                <ext-checkbox
                    id="myget_agree_marketing"
                    labelWrap="true"
                    boxlabel="I agree to receive Idera marketing communications via email and phone call."
                    required="true">
                    </ext-checkbox>

                <ext-checkbox
                    id="myget_student"
                    labelWrap="true"
                    boxlabel="Are you a student?"
                    style="display: none;">
                    </ext-checkbox>
                <ext-checkbox
                    id="myget_customer"
                    labelWrap="true"
                    boxlabel="Are you a Sencha customer?"
                    style="display: none;">
                    </ext-checkbox>
            </ext-formpanel>

            <div>&nbsp;</div>

            <ext-button
                id="myget_start"
                text="Start Trial"
                ui=""
                shadow="true"
                iconCls=""
                arrowAlign="bottom">
              </ext-button>

            <div>&nbsp;</div>

             <ext-label
                id='myget_errors' html=''></ext-label>

            <ext-loadmask
                id='myget_mask'
                style='display: none'
                message='Starting...'/>

        </ext-fieldset>
    </ext-formpanel>

    <ext-formpanel
        style='display: none'
        ref='step2'
        id='myget_step2'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 2 - Sign in to npm Repo"
        shadow="true">

        <ext-label
            id="myget_username"
            html="npm username: x">
            </ext-label>

        <ext-label
            id="myget_password"
            html="npm password: y">
            </ext-label>

        <ext-label
            html="&nbsp;">
            </ext-label>

        <ext-label
            html="Open a command prompt or terminal and run this npm command.">
            </ext-label>

        <ext-label
            html="npm login --registry=https://sencha.myget.org/F/trial/npm/ --scope=@sencha"
            cls="myget_code">
            </ext-label>

    </ext-formpanel>

    <ext-formpanel
        style='display: none'
        ref='step3'
        id='myget_step3'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 3 - Install the Application Generator"
        shadow="true">

        <ext-label
            html="Run this npm command to install the application generator which can scaffold a a new project quickly.">
            </ext-label>

        <ext-label
            html="npm install -g @sencha/ext-gen"
            cls="myget_code">
            </ext-label>

    </ext-formpanel>

    <ext-formpanel
        style='display: none'
        ref='step4'
        id='myget_step4'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 4 - Generate an Ext JS Application"
        shadow="true">

        <ext-label
            html="Run this npm command to generate a new Ext JS project.">
            </ext-label>

        <ext-label
            html="ext-gen app -i"
            cls="myget_code">
            </ext-label>

    </ext-formpanel>

    <ext-formpanel
        style='display: none'
        ref='step5'
        id='myget_step5'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 5 - Debug the new Application"
        shadow="true">

        <ext-label
            html="You're project has been generated, now change to that directory.">
            </ext-label>

        <ext-label
            html="cd ./your-new-app-name"
            cls="myget_code">
            </ext-label>

        <div>&nbsp;</div>

        <ext-label
            html="Run this npm command to start debugging your project. This will open your browser with the application entry point.">
            </ext-label>

        <ext-label
            html="npm start"
            cls="myget_code"></ext-label>

    </ext-formpanel>

    <ext-formpanel
        style='display: none'
        ref='step6'
        id='myget_step6'
        layout='{"type": "vbox", "align": "stretch"}'
        title="Step 6 - What's Next"
        shadow="true">

        <ext-label
            html="<a href='https://examples.sencha.com/extjs' target='_blank'>Check out the Ext JS examples and components</a>">
            </ext-label>

        <ext-label
            html="<a href='https://docs.sencha.com/extjs' target='_blank'>Check out the Ext JS API docs</a>">
            </ext-label>

        <ext-label
            html="<a href='https://docs.sencha.com/extjs/7.1.0/guides/application_architecture/application_architecture.html' target='_blank'>Check out the App Architecture guide.</a>">
            </ext-label>

    </ext-formpanel>

</ext-container>
`;

class AccountCreation extends HTMLElement {

    connectedCallback() {
        this.innerHTML = template;

        this._addListeners();
    }

    _addListeners() {
        let buttonStartTrialEl = this.querySelector('ext-button');
        buttonStartTrialEl.addEventListener('tap', (event) => {
            if (this._isFormValid()) {
                this._fetchDataFromFields();
            }
        });

        let countryEl = this.querySelector('#myget_country');
        countryEl.addEventListener('change', (event) => {
            this._updateCountry(event.country);
        }, false);
    }

    _isFormValid() {
        let firstEl = this.querySelector('#myget_first');
        let lastEl = this.querySelector('#myget_last');
        let companyEl = this.querySelector('#myget_company');
        let emailEl = this.querySelector('#myget_email');
        let titleEl = this.querySelector('#myget_title');
        let phoneEl = this.querySelector('#myget_phone');

        let countryEl = this.querySelector('#myget_country');
        let state_usEl = this.querySelector('#myget_state_us')
        let province_caEl = this.querySelector('#myget_province_ca');
        let state_mxEl = this.querySelector('#myget_state_mx');
        let state_brEl = this.querySelector('#myget_state_br');
        let osEl = this.querySelector('#myget_os');

        let agree_receive_emailEl = this.querySelector('#myget_agree_receive_email');
        let agree_slaEl = this.querySelector('#myget_agree_sla');
        let agree_termsEl = this.querySelector('#myget_agree_terms');
        let agree_marketingEl = this.querySelector('#myget_agree_marketing');

        firstEl.cmp.validate();
        lastEl.cmp.validate();
        companyEl.cmp.validate();
        emailEl.cmp.validate();
        titleEl.cmp.validate();
        phoneEl.cmp.validate();
        countryEl.validate();
        osEl.validate();
        agree_receive_emailEl.cmp.validate();
        agree_slaEl.cmp.validate();
        agree_termsEl.cmp.validate();
        agree_marketingEl.cmp.validate();


        let valid =
            firstEl.cmp.isValid() &&
            lastEl.cmp.isValid() &&
            companyEl.cmp.isValid() &&
            emailEl.cmp.isValid() &&
            titleEl.cmp.isValid() &&
            phoneEl.cmp.isValid() &&
            countryEl.isValid() &&
            osEl.isValid() &&
            agree_receive_emailEl.cmp.isChecked() &&
            agree_slaEl.cmp.isChecked() &&
            agree_termsEl.cmp.isChecked() &&
            agree_marketingEl.cmp.isChecked();

        console.log('valid=' + valid);

        let selectedCountry = countryEl.getValue();
        if (selectedCountry && selectedCountry == "UNITED STATES") {
            state_usEl.validate();
            valid = valid && state_usEl.isValid();
        } else if (selectedCountry && selectedCountry == "CANADA") {
            province_caEl.validate();
            valid = valid && province_caEl.isValid();
        } else if (selectedCountry && selectedCountry == "MEXICO") {
            state_mxEl.validate();
            valid = valid && state_mxEl.isValid();
        } else if (selectedCountry && selectedCountry == "BRAZIL") {
            state_brEl.validate();
            valid = valid && state_brEl.isValid();
        }

        if (valid) {
            this._displayError('');
        } else {
            let message = 'Please enter the required fields.';
            if (!agree_receive_emailEl.cmp.isChecked() ||
                !agree_slaEl.cmp.isChecked() ||
                !agree_termsEl.cmp.isChecked() ||
                !agree_marketingEl.cmp.isChecked()) {
                message += '<br>Please check all the boxes.';
            }
            this._displayError(message);
        }

        return valid;
    }

    _updateCountry(updateCountry) {
        let state_usEl = this.querySelector('#myget_state_us')
        let province_caEl = this.querySelector('#myget_province_ca');
        let state_mxEl = this.querySelector('#myget_state_mx');
        let state_brEl = this.querySelector('#myget_state_br');

        if (updateCountry == "UNITED STATES") {
            state_usEl.style = 'display: block;';
            province_caEl.style = 'display: none;';
            state_mxEl.style = 'display: none;';
            state_brEl.style = 'display: none;';

        } else if (updateCountry == "CANADA") {
            state_usEl.style = 'display: none;';
            province_caEl.style = 'display: block;';
            state_mxEl.style = 'display: none;';
            state_brEl.style = 'display: none;';

        } else if (updateCountry == "MEXICO") {
            state_usEl.style = 'display: none;';
            province_caEl.style = 'display: none;';
            state_mxEl.style = 'display: block;';
            state_brEl.style = 'display: none;';

        } else if (updateCountry == "BRAZIL") {
            state_usEl.style = 'display: none;';
            province_caEl.style = 'display: none;';
            state_mxEl.style = 'display: none;';
            state_brEl.style = 'display: block;';
        } else {
            state_usEl.style = 'display: none;';
            province_caEl.style = 'display: none;';
            state_mxEl.style = 'display: none;';
            state_brEl.style = 'display: none;';
        }
    }

    _fetchDataFromFields() {
        // elements
        let firstEl = this.querySelector('#myget_first');
        let lastEl = this.querySelector('#myget_last');
        let companyEl = this.querySelector('#myget_company');
        let emailEl = this.querySelector('#myget_email');
        let titleEl = this.querySelector('#myget_title');
        let phoneEl = this.querySelector('#myget_phone');
        let countryEl = this.querySelector('#myget_country');
        let state_usEl = this.querySelector('#myget_state_us')
        let province_caEl = this.querySelector('#myget_province_ca');
        let state_mxEl = this.querySelector('#myget_state_mx');
        let state_brEl = this.querySelector('#myget_state_br');

        let agree_receive_emailEl = this.querySelector('#myget_agree_receive_email');
        let agree_slaEl = this.querySelector('#myget_agree_sla');
        let agree_termsEl = this.querySelector('#myget_agree_terms');
        let agree_marketingEl = this.querySelector('#myget_agree_marketing');
        let studentEl = this.querySelector('#myget_student');
        let customerEl = this.querySelector('#myget_customer');

        let osEl = this.querySelector('#myget_os');

        // values
        let first = firstEl.cmp.getValue() || '';
        let last = lastEl.cmp.getValue() || '';
        let company = companyEl.cmp.getValue() || '';
        let email = emailEl.cmp.getValue() || '';
        let title = titleEl.cmp.getValue() || '';
        let phone = phoneEl.cmp.getValue() || '';
        let country = countryEl.getValue() || '';
        let state_us = state_usEl.getValue() || '';
        let province_ca = province_caEl.getValue() || '';
        let state_mx = state_mxEl.getValue() || '';
        let state_br = state_brEl.getValue() || '';
        let agree_receive_email = agree_receive_emailEl.cmp.getChecked() || '';
        let agree_sla = agree_slaEl.cmp.getChecked() || '';
        let agree_terms = agree_termsEl.cmp.getChecked() || '';
        let agree_marketing = agree_marketingEl.cmp.getChecked() || '';
        let student = studentEl.cmp.getChecked() || '';
        let customer = customerEl.cmp.getChecked() || '';
        let os = osEl.getValue() || '';

        let feed = "trial";
        let product = "extjs";

        let jsonRequestData = {
          "first": first,
          "last": last,
          "company": company,
          "email": email,
          "title": title,
          "phone": phone,
          "country": country,
          "state_us": state_us,
          "province_ca": province_ca,
          "state_mx": state_mx,
          "state_br": state_br,
          "agree_receive_email": agree_receive_email,
          "agree_sla": agree_sla,
          "agree_terms": agree_terms,
          "agree_marketing": agree_marketing,
          "student": student,
          "customer": customer,
          "os": os,

          "feed": feed,
          "product": product
        };

        console.log("jsonRequestData=", jsonRequestData);

        this._displayMask(true);

        this._postData('https://test-api.sencha.com/v1/myget', jsonRequestData)
        .then((data) => {
            this._displayMask(false);
            console.log("Response: data=", data);
            this._processAccountCreation(data);
        });
    }

    async _postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic aHR0cHdhd0cHdhd0cHdhdGNoOmYNoOmYNoOmY=',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    }

    _displayMask(visible) {
        let mask = this.querySelector('#myget_mask');
        if (visible) {
            mask.style = 'display: block';
        } else {
            mask.style = 'display: none';
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

}
window.customElements.define('sencha-create-myget-account', AccountCreation);




















