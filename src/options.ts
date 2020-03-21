import { BrowserWindowConstructorOptions } from 'electron'
import { isLinux } from './helpers'

export const options: BrowserWindowConstructorOptions = {
  width: 1024,
  height: 800,
  icon: isLinux ? './icon.png' : undefined,
  webPreferences: {
    nodeIntegration: false,
  },
}
