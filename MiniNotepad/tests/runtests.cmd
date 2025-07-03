@echo off

REM Save the current directory
set current_dir=%cd%

:LOOK_FOR_NODE_MODULES
    REM Change to a directory with node modules
    if exist "node_modules\jest\bin\jest.js" (
        REM Run the tests using the experimental VM modules
        node --experimental-vm-modules node_modules/jest/bin/jest.js 
        goto END
    )

goto IF_IS_ROOT_GOTO_END

:CONTINUE_SEARCHING_FOR_NODE_MODULES
    REM Change to the directory where the package definition is located
    cd ..\
    goto LOOK_FOR_NODE_MODULES

goto END

:IF_IS_ROOT_GOTO_END
    if "%cd%" == "%cd:\%" (
        echo No node modules found
        goto END
    )

goto CONTINUE_SEARCHING_FOR_NODE_MODULES

:END
    REM Restore the path to the current directory
    cd %current_dir%