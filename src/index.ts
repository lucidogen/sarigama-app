import { app, BrowserWindow } from 'electron'
import { appUpdateSetupMain } from './appUpdate.main'
import { quit } from './helpers'
import { options } from './options'
import { settings } from './settings'

// FIXME BEFORE RELEASE
// Update latest links in install instructions

async function createWindow() {
  const win = new BrowserWindow(options)
  await win.loadURL(settings.url)
  win.on('close', e => {
    quit(win)
  })
  appUpdateSetupMain(win)
}

// Make sure we quit app correctly (to avoid localStorage reset due to crash)
process.on('exit', () => {
  app.quit()
})

app.on('window-all-closed', function () {
  app.quit()
})

app.whenReady().then(createWindow)
