Testing
=======

Privly's Safari Extension supports both unit testing and integration
testing. The tests can be run either locally or on SauceLabs.

Unit Testing
------------
The extension's unit testing is supported with the help of `Jasmine
tests <http://jasmine.github.io/2.3/introduction.html>`_ run by the
`Karma Test Runner <http://karma-runner.github.io/0.13/index.html>`_.

To run the unit tests, we need to first install the packages. To do
this, navigate to the :code:`privly.safariextension/privly-applications/test`
directory and run the command :code:`npm install -g karma-cli && npm install`.
Finally navigate to the :code:`test` directory to run the tests.

To run the unit tests locally, run the command
:code:`./run_each.sh ../privly.safariextension/privly-applications/test/karma.conf.js`

To run the unit tests on SauceLabs, run the command
:code:`./run_each.sh ../privly.safariextension/privly-applications/test/karma.conf-ci.js`

Integration Testing
-------------------
The extension presently does not support integration testing with
the help of `Selenium <http://www.seleniumhq.org>`_. So, to make
sure that the extension is functioning as expected, we need to
manually follow the steps given below to ensure the same.

To test injected link functionality:

- Navigate to :code:`http://test.privly.org/test_pages/url_parameters.html` on the browser.
- The :code:`No Parameters` link will get replaced with an injected iframe.
- This injected iframe contains the privly message.
- Click on the privly popover and select :code:`Stop Injecting`.
- The injected iframe will now get replaced with the original text.
- Repeat the test by navigating to :code:`https://www.facebook.com/mohammed.smith.7` on the browser.

To test injected link functionality with host page CSP:

- Navigate to :code:`https://twitter.com/PrivlyTest` on the browser.
- The Privly links should not get replaced by iframes as the host page CSP does not allow iframes of different origin.

To test context menu functionality:

- Navigate to :code:`http://test.privly.org/test_pages/embedposting_iframes.html` on the browser.
- Enter some text inside the first textarea.
- Right click on the text and choose :code:`Privly: New Message` from the context menu.
- A new tab will open for creating the new message link.
- If you are doing this for the first time, it will prompt you to login.
- You will see your entered text in this page. :code:`Save` the message.
- The new message tab will close automatically and the text entered in the textarea will be replaced by a privly link.

To test privly button functionality:

- Click on the privly extension popover and select :code:`Options`.
- In the Options page, uncheck the box that disables privly button and close the page.
- Navigate to :code:`http://test.privly.org/test_pages/embedposting_iframes.html` on the browser.
- Click on the first textarea. We will see privly button that appears on the top-right of the textarea.
- Click the privly button. A new page will open for new message link.
- Enter some text in the page and click :code:`Save`. The page will close.
- The textarea contents will get replaced by the newly generated privly link.
