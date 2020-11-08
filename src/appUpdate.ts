import { autoUpdater, UpdateInfo } from 'electron-updater'
// @ts-ignore (we do not want to resolve Json module in tsconfig to avoid outDir structure issues)
import { version } from '../package.json'
import { AppUpdateAPI } from './appUpdate.types'

export function appUpdateAPI(): AppUpdateAPI {
  let newUpdateReady = false
  return {
    version() {
      return version
    },
    onUpdate(callback) {
      autoUpdater.on(
        'update-available',
        ({ version, releaseDate }: UpdateInfo) => {
          callback({ version, releaseDate })
        }
      )
    },
    onProgress(callback) {
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
          callback({ progress: percent / 100, total, bytesPerSecond })
        }
      )
    },
    onReady(callback) {
      autoUpdater.on('update-downloaded', ({ version }: UpdateInfo) => {
        newUpdateReady = true
        callback({ version })
      })
    },
    restart() {
      if (newUpdateReady) {
        // Just make sure this is not called if we do not have an update ready.
        autoUpdater.quitAndInstall()
      }
    },
  }
}
