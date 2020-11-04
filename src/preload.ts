import { fileCacheAPI } from './fileCache'

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('fileCache', fileCacheAPI())
