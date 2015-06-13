/**
 * @fileOverview reading_process.js manages the process of reading content
 * injected into host pages. The process is as follows:
 *
 * 1. The Info.plist file injects a content script, privly.js, into every
 *    websites the user visits, including iframes.
 * 2. This background script defines a click listener on the modal button,
 *    that will send a message to start or stop the content scripts
 *    depending on the new state of the button.
 *    see: readingProcess.tabChange()
 */


/**
 * @namespace For functionality related to reading content injected into
 * a host page.
 */
var readingProcess = {

  /**
   * Callback assigns content script state according to the modal button.
   *
   * @param {tab} tab The tab that
   * needs to be sent the operation mode.
   */
  tabChange: function(tab) {

    if (tab.title === "" ||
        (tab.url.indexOf("http") !== 0 &&
         tab.url.indexOf("file") !== 0)) {
           return;
    }

    // Message the operation mode to the tab.
    tab.page.dispatchMessage("modeChange", modalButton.badgeText);
  },

  /**
   * Helper for updating multiple tabs simultaneously. Relies on
   * the readingProcess.tabChange function.
   *
   * @param {[tab,...]} tabs The array of tabs that
   * needs to be sent the operation mode.
   */
  tabsChange: function(tabs) {

    // Facilitate modifying an array of tabs by calling this
    // function on every tab in an iterative manner.
    if (tabs.length !== "undefined") {
      for(var i = 0; i < tabs.length; i++) {
        readingProcess.tabChange(tabs[i]);
      }
    }
    return;
  },

  /**
   * Monitor tabs and messages to facilitate reading injected content.
   */
  addListeners: function() {

    // When the main frame of the URL has loaded, we must update the tab's content
    // script for the current operation mode of the modal button.
    safari.application.addEventListener("navigate", function(event) {
      if (event !== "undefined" && event.target !== "undefined" &&
          event.target.toString() === "[object SafariBrowserTab]") {
            readingProcess.tabChange(event.target);
      }
    }, true);

    // Respond to every request to start the content script.
    safari.application.addEventListener("message", function(event) {
      if (event.name === "shouldStartPrivly?") {
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("shouldStartPrivly?", modalButton.badgeText);
      }
    }, true);
  }
};

readingProcess.addListeners();
