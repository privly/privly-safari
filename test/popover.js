/**
 * @fileOverview popover.js Gives testing code for popover.
 * This spec is managed by the Jasmine testing library.
 */

describe ("Popover Suite", function() {

  // Remove the expected DOM
  afterEach(function() {
    document.body.innerHTML = "";
  });

  it("popover element changes properly on activation", function() {

    // Create the expected DOM
    var activateElement = $('<a/>', {id: "activateExtension"});
    var deactivateElement = $('<a/>', {id: "deactivateExtension", style: "display: none"});
    $(document.body).append(activateElement);
    $(document.body).append(deactivateElement);

    // Call the activation function
    activateExtension();

    expect(document.getElementById("activateExtension").style.display).toMatch("none");
    expect(document.getElementById("deactivateExtension").style.display).toMatch("");
  });

  it("popover element changes properly on deactivation", function() {

    // Create the expected DOM
    var activateElement = $('<a/>', {id: "activateExtension", style: "display: none"});
    var deactivateElement = $('<a/>', {id: "deactivateExtension"});
    $(document.body).append(activateElement);
    $(document.body).append(deactivateElement);

    // Call the deactivation function
    deactivateExtension();

    expect(document.getElementById("activateExtension").style.display).toMatch("");
    expect(document.getElementById("deactivateExtension").style.display).toMatch("none");
  });

});
