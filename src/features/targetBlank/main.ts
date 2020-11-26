import { BrowserWindow, shell } from 'electron'

export function targetBlankSetup(win: BrowserWindow) {
  win.webContents.on('new-window', function (e: Event, url) {
    // Open every protocols with '_blank' target externally
    e.preventDefault()
    shell.openExternal(url)
  })
}
