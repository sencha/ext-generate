topSuite("Ext.froala.Editor", ["Ext.froala.*"], function() {
    var editor;

    afterEach(function() {
        editor = Ext.destroy(editor);

        // FroalaEditor leaks these global variable, which are out
        // our control. Therefore, just delete it here so Jazzman
        // doesn't complain.
        delete window["data-events"];
        delete window.eventired;
        delete window.originalName;

    });

    function create(config) {
        editor = Ext.create(
            Ext.apply(
                {
                    xtype: "froalaeditor",
                    width: 500,
                    height: 500,
                    renderTo: Ext.getBody()
                },
                config
            )
        );
    }

    describe("Froala editor tests", function() {
        it("should be created", function() {
            create({
                value:
                    "Froala Editor is a lightweight WYSIWYG HTML Editor written in Javascript that enables rich text editing capabilities for your applications," +
                    "Its complete documentation, specially designed framework plugins and tons of examples make it easy to integrate." +
                    "We're continuously working to add in new features and take the Javascript web WYSIWYG editing capabilities beyond its current limits",
                editor: {
                    autofocus: true
                }
            });
            waits(100);
            runs(function() {
                expect(editor.editorElement.isVisible()).toBeTruthy();
            });
        });

        it("should display the placeholder if user does not configure value", function() {
            create({
                editor: {
                    autofocus: true
                }
            });
            waits(100);
            runs(function() {
                expect(editor.getEditor().placeholder.isVisible()).toBeTruthy();

                // place holder should be hidden after settign the value;
                editor.setValue("hello");
                expect(editor.getEditor().placeholder.isVisible()).toBeFalsy();
            });
        });

        describe("Events", function() {
            it("should allow an event to be configured", function() {
                var clickFired = false;

                create({
                    editor: {
                        autofocus: true
                    },
                    listeners: {
                        "froala.click": function() {
                            clickFired = true;
                        }
                    }
                });
                waits(100);
                runs(function() {
                    jasmine.fireMouseEvent(
                        editor.getEditor().$el[0].children[0],
                        "click"
                    );
                    expect(clickFired).toBeTruthy();
                });
            });

            it("should allow an event to be added and removed procedurally", function() {
                var clickFired = false;

                var onClick = function() {
                    clickFired = true;
                };

                create({});
                waits(100);
                runs(function() {
                    editor.on("froala.click", onClick);
                    jasmine.fireMouseEvent(
                        editor.getEditor().$el[0].children[0],
                        "click"
                    );
                    expect(clickFired).toBe(true);

                    clickFired = false;
                    editor.un("froala.click", onClick);
                    jasmine.fireMouseEvent(
                        editor.getEditor().$el[0].children[0],
                        "click"
                    );
                    expect(clickFired).toBe(false);
                });
            });

            it("should fire the `froala.click` event on click of the input field", function() {
                var clickFired = false;

                create({
                    editor: {
                        autofocus: true
                    },
                    listeners: {
                        "froala.click": function() {
                            clickFired = true;
                        }
                    }
                });
                waits(100);
                runs(function() {
                    jasmine.fireMouseEvent(
                        editor.getEditor().$el[0].children[0],
                        "click"
                    );
                    expect(clickFired).toBeTruthy();
                });
            });

            it("should fire the `ready` event", function() {
                var editorReady = false;

                create({
                    value:
                        "Froala Editor is a lightweight WYSIWYG HTML Editor written in Javascript that enables rich text editing capabilities for your applications," +
                        "Its complete documentation, specially designed framework plugins and tons of examples make it easy to integrate." +
                        "We're continuously working to add in new features and take the Javascript web WYSIWYG editing capabilities beyond its current limits",
                    editor: {
                        autofocus: true
                    },
                    listeners: {
                        ready: function() {
                            editorReady = true;
                        }
                    }
                });

                waits(100);

                runs(function() {
                    expect(editorReady).toBeTruthy();
                });
            });

            it("should handle a camel-cased Froala event", function() {
                var eventFired = false;

                create({
                    editor: {
                        autofocus: true
                    },
                    listeners: {
                        "froala.image.beforeUpload": function() {
                            eventFired = true;
                        }
                    }
                });
                waits(100);
                runs(function() {
                    // Manually fire the event, since doing a file upload 
                    // in a Jasmine test would be difficult.
                    editor.getEditor().events.trigger('image.beforeUpload');
                    expect(eventFired).toBe(true);
                });
            });

        });

        it("should return the editor text on getValue", function() {
            create({
                value: "Hi there",
                editor: {
                    autofocus: true
                }
            });

            waits(100);

            runs(function() {
                // Use toContain here, because the getter will
                // return HTML, such as '<p>Hi there</p>'

                expect(editor.getValue()).toContain("Hi there");

                editor.setValue("welocome");

                expect(editor.getValue()).toContain("welocome");
            });
        });

        it("should be able to configure the toolbar buttons", function() {
            function expectButtons(buttons) {
                var i;

                for (i = 0; i < buttons.length; i++) {
                    expect(
                        editor.editorElement.down(
                            "button[data-cmd= " + buttons[i] + "]"
                        )
                    ).not.toBeUndefined();
                }
            }

            create({
                editor: {
                    autofocus: true,
                    toolbarButtons: [
                        "bold",
                        "italic",
                        "underline",
                        "strikeThrough",
                        "subscript",
                        "superscript"
                    ]
                }
            });

            waits(100);

            runs(function() {
                expectButtons([
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript"
                ]);
            });
        });

        it("should not show the buttons which are not configured", function() {
            create({
                editor: {
                    autofocus: true,
                    toolbarButtons: ["bold"]
                }
            });
            waits(100);
            runs(function() {
                expect(editor.getEditor().opts.toolbarButtons.length).toBe(1);

                expect(
                    editor.editorElement.down('button[data-cmd="italic"]')
                ).toBe(null);
            });
        });
    });
});
