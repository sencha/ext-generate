/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'gray.Application',

    name: 'gray',

    requires: [
        // This will automatically load all classes in the gray namespace
        // so that application classes do not need to require each other.
        'gray.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'gray.view.main.Main'
});
