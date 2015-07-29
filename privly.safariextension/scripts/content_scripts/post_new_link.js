/**
 * @fileOverview Host Page Code
 * This section is for managing the selection of form elements and posting
 * of Privly-type links to those form elements.
 *
 * The flow of events followed in the script:
 * 1. When the user right clicks the page it fires the contextmenu event.
 *    The context information is added using setContextMenuEventUserInfo
 * 2. The script records the target node
 * 3. If the user selects the context menu "Privly New Message",
 *    posting_process.js sends a message to this script to freeze posting.
 *    This prevents future right click events from changing the destination
 *    node.
 * 4. Finally, the background script will message this script the Privly URL
 *    to drop into the original form element.
 */


// Where the Privly URL will be placed is remembered by the contextmenu event
var privlyUrlReceiptNode;

// Variable used to indicate whether there is a pending operation
var pendingPost = false;

document.addEventListener("contextmenu", handleContextMenu, false);

/**
 * Set the context menu information.
 *
 * @param event the event when user right clicks
 *
 */
function handleContextMenu(evt) {

  // The necessary information such as selected text and whether the node
  // is editable or not is added to the context information
  var userInfo = {
    isEditable: evt.target.value,
    content: window.getSelection().toString()
  };
  safari.self.tab.setContextMenuEventUserInfo(evt, userInfo);

  if (!pendingPost) {
    privlyUrlReceiptNode = evt.target;
  }
}

// Three functions that dispatch special events needed for the correct
// insertion of the privlyUrl text inside the form after it is received
function dispatchTextEvent(target, eventType, char) {
  var evt = document.createEvent("TextEvent");
  evt.initTextEvent(eventType, true, true, window, char, 0, "en-us");
  target.dispatchEvent(evt);
}

function dispatchKeyboardEvent(target, eventType, char) {
  var evt = document.createEvent("KeyboardEvent");
  evt.initKeyboardEvent(eventType, true, true, window,
    false, false, false, false,
    0, char);
  target.dispatchEvent(evt);
}

function dispatchClickEvent(target, eventType) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(eventType, true, true, window,
    1, 0, 0, 0, 0, false, false, false, false, 0, null);
  target.dispatchEvent(evt);
}

/**
 * Place the URL into the host page and fire
 * the appropriate events to get the host page
 * to process the link.
 *
 * @param privlyUrl the Privly URL that is received
 *
 */
function receiveURL(privlyUrl) {

  // Focus on the DOM Node.
  privlyUrlReceiptNode.focus();


  dispatchClickEvent(privlyUrlReceiptNode, "click");

  // Some sites need time to execute the initialization
  // callbacks following focus and keydown events.
  setTimeout(function() {

    // Simulate every character of the URL as a keypress and
    // dispatch for it 'keydown', 'keypress', 'textInput' and 'keyup' events
    for (var i = 0; i < privlyUrl.length; i++) {
      var currentChar = privlyUrl.charAt(i);

      dispatchKeyboardEvent(privlyUrlReceiptNode, "keydown", currentChar);
      dispatchKeyboardEvent(privlyUrlReceiptNode, "keypress", currentChar);
      dispatchTextEvent(privlyUrlReceiptNode, "textInput", currentChar);
      dispatchKeyboardEvent(privlyUrlReceiptNode, "keyup", currentChar);
    }

    privlyUrlReceiptNode = undefined;
    pendingPost = false;

  }, 200);
}

// Accepts Privly URL from the background script and updates the pendingPost value
function updatePendingPost(evt) {

  // Drop the Privly URL into the form element
  if (evt.name === "privlyMessage" && evt.message.body !== undefined &&
      evt.message.body.privlyUrl !== undefined && privlyUrlReceiptNode !== undefined &&
      pendingPost) {
        receiveURL(evt.message.body.privlyUrl);
  }

  // It will not change the posting location until the last post completes
  // bacground script can cancel the last pendingPost by messaging
  // pendingPost: false
  if (evt.name === "privlyMessage" && evt.message.body !== undefined &&
      evt.message.body.pendingPost !== undefined) {
        pendingPost = evt.message.body.pendingPost;
  }
}

safari.self.addEventListener("message", updatePendingPost, true);
