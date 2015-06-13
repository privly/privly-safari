/**
 * @fileOverview This file initializes the modal button. This includes
 * initializing the button's state on browser start and interfacing with
 * the reading_process.js so the links will toggle their injection.
 * Changes to the modal button are also made by the popover.html
 * page which provides some controls and links for the extension.
 *
 * The text message on the button determines the operating mode.
 * "off" indicates that the content script can be injected, but it
 * doesn't execute any code.
 *
 * "on" indicates that the content script is injected, and should
 * actively replace links on the user's whitelist.
 *
 */


/**
 * @namespace for the modal button.
 */
var modalButton = {

  /**
   * Gives the current state of the modal button.
   */
  badgeText: "on",

  /**
   * Handles when popover.js sends a command to change the
   * operating mode of the context script.
   */
  modeChange: function() {
    if (modalButton.badgeText === "on") {
      modalButton.badgeText = "off";
    }
    else {
      modalButton.badgeText = "on";
    }

    // Call the tabsChange function defined in reading_process.js with
    // the array of tabs in the active browser window as a parameter
    readingProcess.tabsChange(safari.application.activeBrowserWindow.tabs);
  }
};
