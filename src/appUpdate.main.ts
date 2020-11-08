import { BrowserWindow, ipcMain } from 'electron'
import logger from 'electron-log'
import { autoUpdater, UpdateInfo } from 'electron-updater'
import { AppUpdateInfo } from './appUpdate.types'
logger.transports.file.level = 'debug'
autoUpdater.logger = logger

/// THIS RUNS IN THE MAIN PROCESS ////

export function appUpdateSetupMain(renderer: BrowserWindow) {
  // Current update state caching in case update starts before the app calls the 'onUpdate' thing
  let appUpdate: AppUpdateInfo | undefined
  let checker: NodeJS.Timeout | undefined
  renderer.on('close', () => {
    if (checker) {
      clearInterval(checker)
    }
    autoUpdater.removeAllListeners()
  })

  ipcMain.on('appUpdate_check', (e, checkInterval: number) => {
    console.log('appUpdate_check', checkInterval)
    autoUpdater.removeAllListeners()
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
        e.sender.send('appUpdate_update', appUpdate)
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
      console.log('CHECK')
      autoUpdater.checkForUpdatesAndNotify()
    }, checkInterval * 1000) // seconds to milliseconds
  })

  ipcMain.on('appUpdate_restart', () => {
    console.log('appUpdate_restart')
    if (appUpdate?.status === 'ready') {
      // Just make sure this is not called if we do not have an update ready.
      autoUpdater.quitAndInstall()
    }
  })
}
