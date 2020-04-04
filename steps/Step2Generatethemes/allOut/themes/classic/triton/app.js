/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'triton.Application',

    name: 'triton',

    requires: [
        // This will automatically load all classes in the triton namespace
        // so that application classes do not need to require each other.
        'triton.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'triton.view.main.Main'
});
