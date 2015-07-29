/**
 * @fileOverview This file shows the popover when the toolbar item is
 * clicked. Command events are generated when the user clicks an
 * extension's toolbar item.
 * More about command events can be read about at
 * https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/SafariExtensionGuide.pdf
 */

/**
 * Shows the popover based on the command event.
 *
 * @param event the command event that is dispatched
 *
 */
function showPopoverCallback(event) {
  if (event.command === "privly_toolbar") {
    // Show the menu when the privly icon is clicked
    safari.extension.toolbarItems[0].showPopover();
  }
}

safari.application.addEventListener("command", showPopoverCallback, false);
