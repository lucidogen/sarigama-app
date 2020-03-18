const { app, BrowserWindow } = require("electron");
/*
// Auto updates will come later. We use the web app service worker for this ATM.
const { autoUpdater } = require('electron-updater')
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.checkForUpdatesAndNotify()
*/

const isLinux = {
  netbsd: true,
  aix: false,
  cygwin: false,
  android: true,
  darwin: false,
  freebsd: true,
  linux: true,
  openbsd: true,
  sunos: true,
  win32: false
}[process.platform];

const icon = isLinux ? "./icon.png" : undefined;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    icon,
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.loadURL("https://app.sarigama.io");
}

app.whenReady().then(createWindow);
