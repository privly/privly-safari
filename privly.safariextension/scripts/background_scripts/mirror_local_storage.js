/**
 * @fileOverview This file mirrors the localStorage of the
 * PRIVLY_APPLICATION pages in the background page. Whenever,
 * the localStorage is updated in the PRIVLY_APPLICATION pages,
 * a message is sent to the background page. This file checks
 * for the updates in the localStorage and updates the background
 * page localStorage.
 */

/**
 * Make appropriate updates to localStorage of background page.
 *
 * @param event the message that is received
 *
 */
function updateLocalStorage(event) {
  if (event.name === "privlyMessage" &&
      typeof event.message.body !== "undefined") {
        var payload = event.message.body;
        if (payload.action === "storage/set") {
          Privly.storage.set(payload.key, payload.value);
        } else if (payload.action === "storage/remove") {
          Privly.storage.remove(payload.key);
        }
  }
}

if (typeof safari !== "undefined" && safari.application !== undefined) {
  safari.application.addEventListener("message", updateLocalStorage);
}
