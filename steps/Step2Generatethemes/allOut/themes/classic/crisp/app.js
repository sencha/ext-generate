/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'crisp.Application',

    name: 'crisp',

    requires: [
        // This will automatically load all classes in the crisp namespace
        // so that application classes do not need to require each other.
        'crisp.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'crisp.view.main.Main'
});
