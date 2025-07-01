@echo off
REM Test for the predictions app: check the HTML test runner results
REM Change the path if you use a different location
set FILE=test_predictions.html

REM Run the HTML test and check for FAIL
curl -s %FILE% | findstr /C:"FAIL:"
if not errorlevel 1 (
    echo ERROR: At least one test failed in test_predictions.html
    exit /b 1
) else (
    echo OK: All static content tests passed in test_predictions.html
) 