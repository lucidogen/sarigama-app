import { ipcRenderer } from 'electron'
import { isMac } from '../../helpers/isMac'
import { AppBadgeAPI, appBadge_set } from './types'

/// THIS RUNS IN THE RENDER PROCESS DURING PRELOAD, USING CONTEXT BRIDGE ////

export function appBadgeAPI(): AppBadgeAPI {
  return {
    set(text: string) {
      if (!isMac) {
        // This only works on Mac. Ignore message.
        return
      }
      ipcRenderer.send(appBadge_set, text)
    },
  }
}
