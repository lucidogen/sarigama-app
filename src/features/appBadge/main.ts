import { App, ipcMain } from 'electron'
import { isMac } from '../../helpers/isMac'
import { appBadge_set } from './types'

/// THIS RUNS IN THE MAIN PROCESS ////

export function appBadgeSetup(app: App) {
  if (!isMac) {
    return
  }
  ipcMain.on(appBadge_set, (e, text: string) => {
    app.dock.setBadge(text)
  })
}
