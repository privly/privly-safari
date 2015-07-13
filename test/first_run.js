/**
 * @fileOverview first_run.js Gives testing code for first
 * run functionality. This spec is managed by the Jasmine
 * testing library.
 */

describe ("First Run Suite", function() {

  it("localStorage key and values are initialized properly", function() {

    // The firstRun.checkFirstRun() is called in first_run.js
    expect(ls.getItem("version")).toMatch("0.1.0");
    expect(ls.getItem("posting_content_server_url")).toBeDefined();
    expect(ls.getItem("options/glyph")).toBeDefined();
    expect(ls.getItem("options/glyph").cells).toBeDefined();
    expect(ls.getItem("options/glyph").color).toBeDefined();
  });

});
