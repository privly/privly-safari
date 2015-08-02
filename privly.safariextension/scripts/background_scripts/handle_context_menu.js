/**
 * @fileOverview This file handles the context menu item, "Privly New Message"
 *
 * Workflow of the script:
 * 1. When the user right clicks on the host page, the context information
 *    is sent from post_new_link.js. The validate event is fired on right
 *    click and the context information is checked if the content is editable.
 *    If the content is not editable, the Privly New Message context menu
 *    item is not shown.
 * 2. If the content is editable, the context information is passed to the
 *    posting_process.js file to finally open the posting application.
 */


/**
 * @namespace For functionality related to the handling of context menu
 */
var contextMenu = {

  /**
   * If the content is not editable, do not show the Privly New Message
   * context menu item.
   *
   * @param evt the validate event that is fired
   *
   */
  onValidate: function(evt) {
    if (evt.command === "new_message") {
      if (evt.userInfo === undefined || evt.userInfo === null ||
          evt.userInfo.isEditable === undefined) {
            evt.target.disabled = true;
      }
    }
  },

  /**
   * Pass the context information to posting_process.js
   *
   * @param evt the command event that is fired
   *
   */
  onCommand: function(evt) {
    if (evt.command === "new_message") {
      postingProcess.postingHandler(evt.userInfo.content, "Message");
    }
  }
};

if (typeof safari !== "undefined" && safari.application !== undefined) {
  safari.application.addEventListener("validate", contextMenu.onValidate, false);
  safari.application.addEventListener("command", contextMenu.onCommand, false);
}
