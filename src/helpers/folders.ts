import { join } from 'path'
import { userInfo } from 'os'

const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'

export function cacheFolder() {
  const username = userInfo().username
  if (isMac) {
    return join('Users', username, 'Library', 'Caches')
  } else if (isWin) {
    return join('c:', 'Users', username, 'AppData', 'Local')
  } else {
    return join('home', username, '.cache')
  }
}
