import { contextBridge } from 'electron'
import { appUpdateAPI } from './features/appUpdate/preload'
import { fileCacheAPI } from './features/fileCache/preload'

contextBridge.exposeInMainWorld('appUpdate', appUpdateAPI())
contextBridge.exposeInMainWorld('fileCache', fileCacheAPI())
