/**
 * @fileOverview This file handles the execution of the extension.
 * This includes starting or stopping the extension based on the
 * operation mode message received. This is done by handling the
 * message event.
 * More about message event can be read about at
 * https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/MessagesandProxies/MessagesandProxies.html
 */

/**
 * Performs the specific action based on the message event.
 *
 * @param event the message event that is dispatched
 *
 */
function handleMessage(event) {
  if (event.name === "modeChange") {
    if (event.message === "on") {

      // Turn on the privly.js content script
      privly.start();
    }
    else if (event.message === "off") {

      // Turn off the privly.js content script
      privly.stop();
    }
  }
  else if (event.name === "shouldStartPrivly?" && event.message === "on") {

    // If the current operating mode is on then, start the content script (privly.js)
    privly.start();
  }
}

safari.self.addEventListener("message", handleMessage, false);
