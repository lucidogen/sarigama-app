import { app, BrowserWindow } from 'electron'
import { quit } from './helpers'
import { options } from './options'
import { settings } from './settings'
import logger from 'electron-log'
import { autoUpdater } from 'electron-updater'
logger.transports.file.level = 'debug'
autoUpdater.logger = logger
autoUpdater.checkForUpdatesAndNotify()

// FIXME BEFORE INITIAL PUBLIC RELEASE !!!
// TODO: Update links in documentation / install instructions !!
// TODO: Should use 'latest' in link.
// https://github.com/lucidogen/sarigama-app/releases/latest/download/Sarigama.dmg
// https://www.electron.build/auto-update

async function createWindow() {
  const win = new BrowserWindow(options)
  await win.loadURL(settings.url)
  win.on('close', e => {
    quit(win)
  })
}

// Make sure we quit app correctly (to avoid localStorage reset due to crash)
process.on('exit', () => {
  app.quit()
})

app.on('window-all-closed', function () {
  app.quit()
})

app.whenReady().then(createWindow)
