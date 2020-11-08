import { ipcRenderer } from 'electron'
// @ts-ignore (we do not want to resolve Json module in tsconfig to avoid outDir structure issues)
import { version } from '../package.json'
import { AppUpdateAPI, AppUpdateInfo } from './appUpdate.types'

/// THIS RUNS IN THE RENDER PROCESS DURING PRELOAD, USING CONTEXT BRIDGE ////

export function appUpdateAPI(): AppUpdateAPI {
  return {
    version() {
      return version
    },
    onUpdate(callback, checkInterval) {
      ipcRenderer.removeAllListeners('app_update')
      ipcRenderer.on('appUpdate_update', (e, update: AppUpdateInfo) => {
        callback(update)
      })
      ipcRenderer.send('appUpdate_check', checkInterval)
    },
    restart() {
      ipcRenderer.send('appUpdate_restart')
    },
  }
}
