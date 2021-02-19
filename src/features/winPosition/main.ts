import { BrowserWindow, ipcMain } from 'electron'
import {
  WinPosition,
  winPosition_changed,
  winPosition_onChange,
  winPosition_set,
} from './types'

/// THIS RUNS IN THE MAIN PROCESS ////

export function winPositionSetup(win: BrowserWindow) {
  ipcMain.on(winPosition_set, (e, pos: WinPosition) => {
    win.setBounds(pos)
  })
  ipcMain.on(winPosition_onChange, e => {
    win.on('resize', () => {
      e.sender.send(winPosition_changed, win.getBounds())
    })
    win.on('moved', () => {
      e.sender.send(winPosition_changed, win.getBounds())
    })
    e.sender.send(winPosition_changed, { default: true, ...win.getBounds() })
  })
}
