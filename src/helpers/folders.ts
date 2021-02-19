import { homedir } from 'os'
import { join } from 'path'
import { isMac } from './isMac'

const isWin = process.platform === 'win32'

export function cacheFolder() {
  if (isMac) {
    return join(homedir(), 'Library', 'Caches')
  } else if (isWin) {
    return join(homedir(), 'AppData', 'Local')
  } else {
    return join(homedir(), '.cache')
  }
}
