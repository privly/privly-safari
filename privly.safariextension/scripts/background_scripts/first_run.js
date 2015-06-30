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
    var postingDomain = ls.getItem("posting_content_server_url");

    if (postingDomain === undefined || postingDomain === null) {
      ls.setItem("posting_content_server_url", "https://privlyalpha.org");
    }

    // Initialize the spoofing glyph
    // The generated string is not cryptographically secure and should not be used
    // for anything other than the glyph.
    if (ls.getItem("glyph_cells") === undefined) {

      // Dissable the posting button by default if the user already has
      // the extension installed.
      if (ls.getItem("posting_content_server_url") !== undefined) {
        ls.setItem("Options:DissableButton", "true");
      }

      ls.setItem("glyph_color", Math.floor(Math.random()*16777215).toString(16));
      var glyph_cells = ((Math.random() < 0.5) ? "false" : "true");
      for(var i = 0; i < 14; i++) {
        glyph_cells += "," + ((Math.random() < 0.5) ? "false" : "true");
      }
      ls.setItem("glyph_cells", glyph_cells);
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
    // todo, set this dynamically
    var runningVersion = "0.1.0";
    var lastRunVersion = ls.getItem("version");

    if (lastRunVersion !== runningVersion) {

      // Set this first or else it will open repeatedly on new Xul overlays
      ls.setItem("version", runningVersion);
      firstRun.initializeApplication();
    }
  }
}

// Run this script
firstRun.checkFirstRun();
