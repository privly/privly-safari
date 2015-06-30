/**
 * @fileOverview This file provides for the menu that pops over when
 * you click on the Privly icon in the browser Safari.
 */

/**
 * Helper function for activateExtension() and deactivateExtension().
 *
 * @param {node} toShow The element that needs to be shown
 * @param {node} toHide The element that needs to be hidden
 */
function extensionStateChange(toShow, toHide) {

  /* istanbul ignore if */
  if (typeof safari !== "undefined" && safari.extension !== undefined) {
    safari.extension.globalPage.contentWindow.modalButton.modeChange();
  }

  // Update the UI
  $(toShow).show();
  $(toHide).hide();
}

/**
 * Activates application injection by messaging the background scripting
 * environment. The background scripting environment will then message
 * the privly.js content script.
 */
function activateExtension() {

  // Call the helper function to make necessary changes
  extensionStateChange("#deactivateExtension", "#activateExtension");
}

/**
 * Deactivates application injection by messaging the background scripting
 * environment. The background scripting environment will then message
 * the privly.js content script.
 */
function deactivateExtension() {

  // Call the helper function to make necessary changes
  extensionStateChange("#activateExtension", "#deactivateExtension");
}

// Set the activation UI
$("#deactivateExtension").click(deactivateExtension);
$("#activateExtension").click(activateExtension);
