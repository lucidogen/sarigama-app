import { contextBridge } from 'electron'
// @ts-ignore
import { version } from '../package.json'
import { fileCacheAPI } from './fileCache'

console.log('SARIGAMA_APP VERSION', version)

contextBridge.exposeInMainWorld('fileCache', fileCacheAPI())
contextBridge.exposeInMainWorld('electron', {
  appVersion() {
    return version
  },
})
console.log('PRELOAD DONE')
