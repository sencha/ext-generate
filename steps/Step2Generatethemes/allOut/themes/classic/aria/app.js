/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'aria.Application',

    name: 'aria',

    requires: [
        // This will automatically load all classes in the aria namespace
        // so that application classes do not need to require each other.
        'aria.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'aria.view.main.Main'
});
