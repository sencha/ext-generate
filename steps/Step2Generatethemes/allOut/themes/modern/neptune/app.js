/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'neptune.Application',

    name: 'neptune',

    requires: [
        // This will automatically load all classes in the neptune namespace
        // so that application classes do not need to require each other.
        'neptune.*'
        ,'Ext.*'
],

    // The name of the initial view to create.
    mainView: 'neptune.view.main.Main'
});
