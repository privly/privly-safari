/**
 * @fileOverview This file handles the command event. Command events
 * are generated when the user clicks an extension's toolbar item
 * or chooses an extension's menu item (including contextual menu item).
 * More about command events can be read about at
 * https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/SafariExtensionGuide.pdf
 */

/**
 * Performs the specific action based on the command event.
 *
 * @param event the command event that is dispatched
 *
 */
function performCommand(event) {
  if (event.command === "new_message") {
    safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "privly-applications/Message/new.html";
  }
  else if (event.command === "privly_toolbar") {
    // Show the menu when the privly icon is clicked
    safari.extension.toolbarItems[0].showPopover();
  }
}

safari.application.addEventListener("command", performCommand, false);
