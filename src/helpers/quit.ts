import { BrowserWindow } from 'electron'

export function quit(win: BrowserWindow) {
  win.webContents
    .executeJavaScript('window.LOGIN_INFO.quit()')
    .then(() => {
      console.log('Quit OK')
    })
    .catch(err => {
      console.error(err)
    })
}
