@echo off
REM Deployment script for Windows users without Git Bash
REM Uses PuTTY's pscp command for file transfer

echo ======================================
echo History for Homeschoolers - Deployment
echo ======================================
echo.

REM Check if deploy.config exists
if not exist "deploy.config" (
    echo Error: deploy.config not found!
    echo Please create deploy.config with your server details.
    echo See deploy.config.example for template.
    pause
    exit /b 1
)

REM Check if out directory exists
if not exist "out" (
    echo Error: out/ directory not found!
    echo Run 'npm run build' first to generate the static site.
    pause
    exit /b 1
)

REM Load configuration (simplified for batch)
REM You'll need to edit this file directly with your details
set SSH_USER=your_username
set SSH_HOST=unclesvf.com
set REMOTE_PATH=public_html/history

echo Configuration:
echo   Server: %SSH_USER%@%SSH_HOST%
echo   Remote Path: %REMOTE_PATH%
echo   Local Path: .\out\
echo.

set /p CONFIRM="Deploy to production? (y/N): "
if /i not "%CONFIRM%"=="y" (
    echo Deployment cancelled.
    pause
    exit /b 0
)

echo.
echo Starting deployment using WinSCP...
echo.

REM Use WinSCP command-line for deployment
REM Download WinSCP from: https://winscp.net/
winscp.com /command ^
    "open sftp://%SSH_USER%@%SSH_HOST%" ^
    "synchronize remote out %REMOTE_PATH% -delete -mirror" ^
    "exit"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Deployment successful!
    echo.
    echo Your site should now be live at:
    echo https://unclesvf.com/history/
    echo.
) else (
    echo.
    echo ✗ Deployment failed!
    echo Check your credentials and network connection.
    echo.
)

pause
