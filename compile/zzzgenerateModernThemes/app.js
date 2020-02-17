/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'generateModernThemes.Application',

    name: 'generateModernThemes',

    requires: [
        // This will automatically load all classes in the generateModernThemes namespace
        // so that application classes do not need to require each other.
        'generateModernThemes.*'
    ],

    // The name of the initial view to create.
    mainView: 'generateModernThemes.view.main.Main'
});
