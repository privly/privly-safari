#
# Runs each of the test sets defined below.
#
echo "This script steps through a series of test sets that run via Karma."
echo "Karma is a testing framework that will launch browsers and monitor files to re-run tests every time an edit is saved"
echo "!!!!!!"
echo "This will run all the tests currently defined in run_each.sh"
echo "You can also have tests run every time you save a file by defining the scripts you want to test with:"
echo "export FILES_TO_TEST=YOUR_FILES_HERE"
echo "Files are referenced relative to the privly-applications repository."
echo "Then you can issue 'karma start'"
echo "These tests are run only in the Safari browser"
echo "!!!!!!"

# Change the current working directory to the directory of the run_each script
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# Default to running the tests locally
# If you want to run on Continuous Integration
# then you can pass "karma.conf-ci.js" as the first positional argument.
KARMA="../privly.safariextension/privly-applications/test/karma.conf.js"
if [ ! -z "$1" ]
then
  KARMA=$1
fi

# We need to report back a non-zero number if any of the tests failed
declare -i ISFAIL=0

runTest () {
  echo ""
  echo "running tests on $1"
  echo ""
  export FILES_TO_TEST=$1

  # Determine whether this runs on CI or not
  if [ "$KARMA" == "../privly.safariextension/privly-applications/test/karma.conf-ci.js" ]
  then
    karma start $KARMA --single-run --sauce-browsers=Safari
  else
    karma start $KARMA --single-run --browsers Safari
  fi
  ISFAIL=$(($ISFAIL|$?))
}

# These are the scripts that will be loaded for every test
commonScripts="vendor/jquery.min.js,shared/javascripts/*.js"

# Each line below executes the scripts in order in the context of the browsers.
runTest "$commonScripts,../scripts/background_scripts/first_run.js,../../test/first_run.js,../scripts/popover.js,../../test/popover.js,../scripts/background_scripts/mirror_local_storage.js,../../test/mirror_local_storage.js,../scripts/background_scripts/handle_context_menu.js,../../test/handle_context_menu.js"

if [ ! $ISFAIL -eq 0 ]
then
  echo "You have some work to do: tests are failing"
  exit 1
fi

exit 0
