/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'graphite.Application',

    name: 'graphite',

    requires: [
        // This will automatically load all classes in the graphite namespace
        // so that application classes do not need to require each other.
        'graphite.*'
    ],

    // The name of the initial view to create.
    mainView: 'graphite.view.main.Main'
});
