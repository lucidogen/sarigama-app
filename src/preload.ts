import { contextBridge } from 'electron'
import { appUpdateAPI } from './appUpdate.renderer'
import { fileCacheAPI } from './fileCache'

contextBridge.exposeInMainWorld('appUpdate', appUpdateAPI())
contextBridge.exposeInMainWorld('fileCache', fileCacheAPI())
