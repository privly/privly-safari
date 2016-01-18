/**
 * @fileOverview This file opens a tab with the first run html doc under
 * appropriate conditions when the extension is loaded on extension install.
 *
 * Appropriate conditions fall under two circumstances:
 * 1. LocalStorage does not have a stored value for the version of privly
 *    installed. (Privly was just installed or localStorage was cleared)
 * 2. The version stored in Info.plist differs from the version stored in
 *    localStorage. (Privly was updated)
 *
 **/

/**
 * @namespace for the firstRun functionality.
 */
var firstRun = {

  /**
   * Initialize the content server selection and the anti-spoofing
   * glyph.
   */
  initializeApplication: function() {

    // Open the first run page only on new installations.
    var postingDomain = Privly.storage.get("posting_content_server_url");

    if (postingDomain === undefined || postingDomain === null) {
      Privly.storage.set("posting_content_server_url", "https://privlyalpha.org");
    }

    // Initialize the spoofing glyph
    // The generated string is not cryptographically secure and should not be used
    // for anything other than the glyph.
    if (Privly.glyph.getGlyph() === null) {

      // Dissable the posting button by default if the user already has
      // the extension installed.
      if (Privly.storage.get("posting_content_server_url") !== undefined) {
        Privly.options.setPrivlyButtonEnabled(false);
      }

      // Generate a new glyph for the current user
      Privly.glyph.generateGlyph();
    }

    /* istanbul ignore if */
    if (typeof safari !== "undefined" && safari.application !== undefined) {

      // Finally, open the first-run page
      safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "privly-applications/Pages/ChromeFirstRun.html";
    }
  },

  /**
   * Check whether the first run html page should be opened.
   */
  checkFirstRun: function() {

    // Set the expected version to compare against the stored version
    // Set the expected version dynamically if possible

    var runningVersion;
    /* istanbul ignore if */
    if (typeof safari !== "undefined" && safari.extension !== undefined) {
      runningVersion = safari.extension.displayVersion;
    } else {
      runningVersion = "0.1.0";
    }
    var lastRunVersion = Privly.storage.get("version");

    if (lastRunVersion !== runningVersion) {

      // Set this first or else it will open repeatedly on new Xul overlays
      Privly.storage.set("version", runningVersion);
      firstRun.initializeApplication();
    }
  }
};

// Run this script
firstRun.checkFirstRun();
