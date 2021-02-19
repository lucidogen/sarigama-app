import { app, BrowserWindow } from 'electron'
import { appBadgeSetup } from './features/appBadge/main'
import { appUpdateSetup } from './features/appUpdate/main'
import { targetBlankSetup } from './features/targetBlank/main'
import { winPositionSetup } from './features/winPosition/main'
import { quit } from './helpers'
import { options } from './options'
import { settings } from './settings'

async function createWindow() {
  const win = new BrowserWindow(options)
  await win.loadURL(settings.url)
  win.on('close', e => {
    quit(win)
  })
  appUpdateSetup(win)
  winPositionSetup(win)
  targetBlankSetup(win)
  appBadgeSetup(app)
}

// Make sure we quit app correctly (to avoid localStorage reset due to crash)
process.on('exit', () => {
  app.quit()
})

app.on('window-all-closed', function () {
  app.quit()
})

app.whenReady().then(createWindow)
