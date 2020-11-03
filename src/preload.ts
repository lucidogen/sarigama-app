import { app } from 'electron'
import { setupFileCache } from './fileCache'
window.SARIGAMA_APP = app.getVersion()

setupFileCache(window)
