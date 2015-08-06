/**
 * @fileOverview handle_context_menu.js Gives testing code for handling
 * the context menu. This spec is managed by the Jasmine testing library.
 */

describe ("Handle Context Menu Suite", function() {

  it("context menu is disabled when content is not editable", function() {

    // Build the event to show that content is not editable
    var setEvent = {
      command: "new_message",
      userInfo: {
        isEditable: undefined
      },
      target: {
        disabled: false
      }
    };

    contextMenu.onValidate(setEvent);
    expect(setEvent.target.disabled).toBe(true);
  });

});
