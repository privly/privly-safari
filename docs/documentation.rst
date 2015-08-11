Documentation
=============

Documentation at https://privly-safari.readthedocs.org

.. image:: https://travis-ci.org/sammyshj/privly-safari.svg?branch=master
    :target: https://travis-ci.org/sammyshj/privly-safari

.. image:: https://coveralls.io/repos/sammyshj/privly-safari/badge.png
    :target: https://coveralls.io/r/sammyshj/privly-safari


Build
-----

In the current directory, run :code:`make html` to build the Sphinx
documentation locally.

To build the html files for the javascript files in the extension,
clone the repo https://github.com/sammyshj/privly-jsdoc-toolkit

Copy the javascript files to the `src` directory of the cloned repo.
Then, run,
:code:`java -jar jsrun.jar app/run.js -t=templates/jsdoc src/*.*`
inside the cloned repo directory.

The html files generated will be inside the `out` directory. Copy
the html files to the current directory and run :code:`make html` again
to see the changes.
