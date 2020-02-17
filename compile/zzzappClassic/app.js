/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'appClassic.Application',

    name: 'appClassic',

    requires: [
        // This will automatically load all classes in the appClassic namespace
        // so that application classes do not need to require each other.
        'appClassic.*'
    ],

    // The name of the initial view to create.
    mainView: 'appClassic.view.main.Main'
});
