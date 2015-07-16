/**
 * @fileOverview first_run.js Gives testing code for first
 * run functionality. This spec is managed by the Jasmine
 * testing library.
 */

describe ("First Run Suite", function() {

  it("localStorage key and values are initialized properly", function() {

    // The firstRun.checkFirstRun() is called in first_run.js
    expect(Privly.storage.get("version")).toMatch("0.1.0");
    expect(Privly.storage.get("posting_content_server_url")).toBeDefined();
    expect(Privly.storage.get("options/glyph")).toBeDefined();
    expect(Privly.storage.get("options/glyph").cells).toBeDefined();
    expect(Privly.storage.get("options/glyph").color).toBeDefined();
    expect(Privly.options.isPrivlyButtonEnabled()).toBe(false);
    expect(Privly.storage.get("posting_content_server_url")).toMatch("https://privlyalpha.org");
  });

});
