import { ipcRenderer } from 'electron'
import {
  WinPosition,
  WinPositionAPI,
  winPosition_changed,
  winPosition_onChange,
  winPosition_set,
} from './types'

/// THIS RUNS IN THE RENDER PROCESS DURING PRELOAD, USING CONTEXT BRIDGE ////

export function winPositionAPI(): WinPositionAPI {
  return {
    set(pos) {
      ipcRenderer.send(winPosition_set, pos)
    },
    onChange(callback) {
      // Make sure only one callback is listening.
      ipcRenderer.removeAllListeners(winPosition_changed)
      ipcRenderer.on(winPosition_changed, (e, pos: WinPosition) => {
        callback(pos)
      })
      ipcRenderer.send(winPosition_onChange)
    },
  }
}
