#
# Runs each of the test sets defined below.
#
echo "This script steps through a series of test sets that run via Karma."
echo "Karma is a testing framework that will launch browsers and monitor files to re-run tests every time an edit is saved"
echo "!!!!!!"
echo "This will run all the tests currently defined in run_each.sh"
echo "You can also have tests run every time you save a file by defining the scripts you want to test with:"
echo "export FILES_TO_TEST=YOUR_FILES_HERE"
echo "Then you can issue 'karma start'"
echo "For the Safari extension, the tests are run only in the Safari browser"
echo "!!!!!!"

# Default to running the tests locally
# If you want to run on Continuous Integration
# then you can pass "karma.conf-ci.js" as the first positional argument.
KARMA="karma.conf.js"
KARMA_DIRECTORY="../privly.safariextension/privly-applications/test/"
if [ ! -z "$1" ]
then
  KARMA=$1
fi

# We need to report back a non-zero number if any of the tests failed
declare -i ISFAIL=0

runTest () {
  echo ""
  echo "running tests on shared libraries and $1"
  echo ""
  export FILES_TO_TEST=$1
  karma start $KARMA_DIRECTORY$KARMA --single-run --browsers Safari
  ISFAIL=$(($ISFAIL|$?))
}

# Line below executes the scripts in order in the context of the browsers.
runTest 'sample_test.js'

if [ ! $ISFAIL -eq 0 ]
then
  echo "You have some work to do: tests are failing"
  exit 1
fi

exit 0
