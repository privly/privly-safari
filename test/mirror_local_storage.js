/**
 * @fileOverview mirror_local_storage.js Gives testing code for updating
 * the localStorage functionality. This spec is managed by the Jasmine
 * testing library.
 */

describe ("Mirror Local Storage Suite", function() {

  it("localStorage key and value is set properly", function() {

    // Build the message for setting localStorage key, value
    var setMessage = {
      name: "privlyMessage",
      message: {
        body: {
          action: "storage/set",
          key: "privlySafariExtension",
          value: "True"
        }
      }
    };

    updateLocalStorage(setMessage);
    expect(Privly.storage.get(setMessage.message.body.key)).toMatch(setMessage.message.body.value);
  });

  it("localStorage key and value is removed properly", function() {

    // Build the message for removing localStorage key, value
    var removeMessage = {
      name: "privlyMessage",
      message: {
        body: {
          action: "storage/remove",
          key: "privlySafariExtension"
        }
      }
    };

    updateLocalStorage(removeMessage);
    expect(Privly.storage.get(removeMessage.message.body.key)).toBeNull();
  });

});
