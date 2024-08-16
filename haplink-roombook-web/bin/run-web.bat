@echo off
echo.
echo [haplink] 运行Vue CLI测试web
echo.

%~d0
cd %~dp0

cd ..
npm run dev

pause
