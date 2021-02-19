import { BrowserWindow, ipcMain } from 'electron'
// import logger from 'electron-log'
import { autoUpdater, UpdateInfo } from 'electron-updater'
import {
  AppUpdateInfo,
  appUpdate_check,
  appUpdate_restart,
  appUpdate_update,
} from './types'
// logger.transports.file.level = 'debug'
// autoUpdater.logger = logger

/// THIS RUNS IN THE MAIN PROCESS ////

export function appUpdateSetup(win: BrowserWindow) {
  // Current update state caching in case update starts before the app calls the 'onUpdate' thing
  let appUpdate: AppUpdateInfo | undefined
  let checker: NodeJS.Timeout | undefined
  win.on('close', () => {
    if (checker) {
      clearInterval(checker)
    }
    autoUpdater.removeAllListeners()
  })

  ipcMain.on(
    appUpdate_check,
    (e, checkInterval: number, allowPrerelease: boolean) => {
      // console.log('appUpdate_check', checkInterval)
      autoUpdater.removeAllListeners()
      autoUpdater.allowPrerelease = allowPrerelease
      if (checker) {
        clearInterval(checker)
      }
      if (checkInterval === 0) {
        return
      }

      autoUpdater.on(
        'update-available',
        ({ version, releaseDate }: UpdateInfo) => {
          appUpdate = {
            status: 'available',
            needsRestart: true,
            version,
            releaseDate,
          }
          e.sender.send(appUpdate_update, appUpdate)
        }
      )

      autoUpdater.on(
        'download-progress',
        ({
          percent,
          total,
          bytesPerSecond,
        }: {
          percent: number
          total: number
          bytesPerSecond: number
        }) => {
          if (!appUpdate) {
            // Should never happen
            appUpdate = {
              status: 'available',
              needsRestart: true,
            }
          }
          appUpdate.status = 'downloading'
          appUpdate.progress = percent / 100
          appUpdate.total = total
          appUpdate.bytesPerSecond = bytesPerSecond
          e.sender.send('appUpdate_update', appUpdate)
        }
      )

      autoUpdater.on(
        'update-downloaded',
        ({ version, releaseDate }: UpdateInfo) => {
          if (!appUpdate) {
            // Should never happen
            appUpdate = {
              status: 'available',
              version,
              releaseDate,
              needsRestart: true,
            }
          }
          appUpdate.status = 'ready'
          appUpdate.needsRestart = true
          e.sender.send('appUpdate_update', appUpdate)
        }
      )

      checker = setInterval(() => {
        // console.log('CHECK')
        if (!appUpdate) {
          // Only check if we do not have an update download in progress already
          autoUpdater.checkForUpdatesAndNotify()
        }
      }, checkInterval * 1000) // seconds to milliseconds
    }
  )

  ipcMain.on(appUpdate_restart, () => {
    // console.log('appUpdate_restart')
    if (appUpdate?.status === 'ready') {
      // Just make sure this is not called if we do not have an update ready.
      autoUpdater.quitAndInstall()
    }
  })
}
