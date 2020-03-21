import { app, BrowserWindow } from 'electron'
import { quit } from './helpers'
import { options } from './options'

// const APP_URL = 'https://app.sarigama.io'
const APP_URL = 'http://localhost:1233'
/*
// Auto updates will come later. We use the web app service worker for this ATM.
const { autoUpdater } = require('electron-updater')
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.checkForUpdatesAndNotify()
*/

function createWindow() {
  const win = new BrowserWindow(options)
  win.loadURL(APP_URL)
  win.on('close', e => {
    quit(win)
  })
}

// Make sure we quit app correctly (to avoid localStorage reset due to crash)
process.on('exit', () => {
  app.quit()
})

app.whenReady().then(createWindow)
