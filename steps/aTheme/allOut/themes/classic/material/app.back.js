/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'material.Application',

    name: 'material',

    requires: [
        // This will automatically load all classes in the material namespace
        // so that application classes do not need to require each other.
        'material.*'
    ],

    // The name of the initial view to create.
    mainView: 'material.view.main.Main'
});
