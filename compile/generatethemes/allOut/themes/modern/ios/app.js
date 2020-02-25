/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ios.Application',

    name: 'ios',

    requires: [
        // This will automatically load all classes in the ios namespace
        // so that application classes do not need to require each other.
        'ios.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'ios.view.main.Main'
});
