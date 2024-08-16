@echo off
echo.
echo [haplink] 安装Web依赖目录node_modules
echo.

%~d0
cd %~dp0

cd ..
npm install --registry=https://registry.npmmirror.com

pause
