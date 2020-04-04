# ExtReactModern Quick Start :smile:

This Quick Start guide will get you up and running with a template ExtReact application

<hr></hr>

## Step 1: Start a terminal/command window

## Step 2: Change Directory to a location where you want to create the initial project folder

## Step 3: Login to the npm repository

- In the terminal/command window, run the following:

<div class="outer">
  <div class="example">
    npm login --registry=https://sencha.myget.org/F/{feed}/npm/ --scope=@sencha
  </div>
  <button class="copy tooltip" onclick="window['copyToClipboard']('npm login --registry=https://sencha.myget.org/F/{feed}/npm/ --scope=@sencha')"><span class="fas fa-clipboard"></span><span class="tooltiptext">Copy to Clipboard</span></button>
</div>

- respond to the prompts by adding Username, Password and Email


<div class="border">
  <b>Username:</b> {username}<br/>
  <b>Password:</b> {password} &nbsp;&nbsp;(the password will not display)<br/>
  <b>Email: (this IS public)</b> {email}
</div>

- The following message will appear in the termanal/command window after successful login

<div class="border">Logged in as marcgusmano to scope @sencha on https://sencha.myget.org/F/{feed}/npm/.</div>

## Step 4: Create a React application with create-react-app and ExtReact template

- In the terminal/command window, run the following:

<div class="outer">
  <div class="example">
  npx create-react-app --template @sencha/ext-react-modern ext-react-modern-demo
  </div>
  <button class="copy tooltip" onclick="copyToClipboard('npx create-react-app --template @sencha/ext-react-modern ext-react-modern-demo')"><span class="fas fa-clipboard"></span><span class="tooltiptext">Copy to Clipboard</span></button>
</div>

- create-react-app will create a new application using the ext-react-modern template

## Step 5: Change Directory to newly created app folder

- When create-react-app is completed, in the terminal/command window, run the following:

<div class="outer">
  <div class="example">
  cd ext-react-modern-demo
  </div>
  <button class="copy tooltip" onclick="copyToClipboard('cd ext-react-modern-demo')"><span class="fas fa-clipboard"></span><span class="tooltiptext">Copy to Clipboard</span></button>
</div>

## Step 6: Start the ExtReact application

- To start the ExtReact application, run the following in the terminal/command window:

<div class="outer">
  <div class="example">
  npm start
  </div>
  <button class="copy tooltip" onclick="copyToClipboard('npm start')"><span class="fas fa-clipboard"></span><span class="tooltiptext">Copy to Clipboard</span></button>
</div>

- The ExtReact application will load in a browser window!

#### QuickStart loaded in {diff}
