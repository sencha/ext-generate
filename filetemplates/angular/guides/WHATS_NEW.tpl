## What's new for @sencha/ext-angular-{toolkit}{bundle}

### What's new in version 7.2.0

### What's new in version 7.1

#### separate modern and classic packages

7.1 now supports separate packages for the modern and classic toolkits of Ext JS
- @sencha/ext-angular-modern
- @sencha/ext-angular-classic

The @sencha/ext-angular package has been deprecated

#### element name changes

New pattern is '<Ext', then capital letter, then small letters for rest of name

- previous element name pattern:  <ext-button>
- new element name pattern: <ExtButton>

#### deprecated packages - see git repo

#### launching an app
####
#### all imports now from '@sencha/ext-angular-{toolkit}{bundle}';
#### viewport="true"
####
#### need a rood <div> around plain text
#### onReady event - all components available, cmp and cmpObj
#### using cmpObj