import { app, BrowserWindow } from 'electron'
import { quit } from './helpers'
import { options } from './options'
import { settings } from './settings'
/*
// Auto updates will come later. We use the web app service worker for this ATM.
const { autoUpdater } = require('electron-updater')
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.checkForUpdatesAndNotify()
*/

async function createWindow() {
  const win = new BrowserWindow(options)
  await win.loadURL(settings.url)
  console.log('Starting Sarigama app', app.getVersion())
  win.webContents.executeJavaScript(
    `window.SARIGAMA_APP = ${JSON.stringify(app.getVersion())}`
  )

  win.on('close', e => {
    quit(win)
  })
}

// Make sure we quit app correctly (to avoid localStorage reset due to crash)
process.on('exit', () => {
  app.quit()
})

app.whenReady().then(createWindow)
