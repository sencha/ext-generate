/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'generateClassicThemes.Application',

    name: 'generateClassicThemes',

    requires: [
        // This will automatically load all classes in the generateClassicThemes namespace
        // so that application classes do not need to require each other.
        'generateClassicThemes.*'
    ],

    // The name of the initial view to create.
    mainView: 'generateClassicThemes.view.main.Main'
});
