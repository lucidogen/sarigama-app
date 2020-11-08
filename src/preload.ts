import { contextBridge } from 'electron'
import { appUpdateAPI } from './appUpdate'
import { fileCacheAPI } from './fileCache'

contextBridge.exposeInMainWorld('appUpdate', appUpdateAPI())
contextBridge.exposeInMainWorld('fileCache', fileCacheAPI())
