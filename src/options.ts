import { BrowserWindowConstructorOptions } from 'electron'
import path from 'path'
import { isLinux } from './helpers'

export const options: BrowserWindowConstructorOptions = {
  width: 1024,
  height: 800,
  icon: isLinux ? './icon.png' : undefined,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: false,
    nodeIntegrationInWorker: false,
    contextIsolation: true,
  },
}
