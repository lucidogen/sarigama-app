import { contextBridge } from 'electron'
import { appBadgeAPI } from './features/appBadge/preload'
import { appBadge } from './features/appBadge/types'
import { appUpdateAPI } from './features/appUpdate/preload'
import { appUpdate } from './features/appUpdate/types'
import { fileCacheAPI } from './features/fileCache/preload'
import { fileCache } from './features/fileCache/types'
import { winPositionAPI } from './features/winPosition/preload'
import { winPosition } from './features/winPosition/types'

contextBridge.exposeInMainWorld(appBadge, appBadgeAPI())
contextBridge.exposeInMainWorld(appUpdate, appUpdateAPI())
contextBridge.exposeInMainWorld(winPosition, winPositionAPI())
contextBridge.exposeInMainWorld(fileCache, fileCacheAPI())
