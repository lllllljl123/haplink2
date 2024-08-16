@echo off
echo.
echo [haplink] 生成web打包目录dist
echo.

%~d0
cd %~dp0

cd ..
npm run build:prod

pause
