// THIS FILE SHOULD BE KEPT IN SYNC WITH '@lucidogen/useragent'
// UNTIL WE PUBLISH '@lucidogen/useragent' AND CAN IMPORT
// FROM THERE.

export interface AppUpdateInfo {
  status: 'available' | 'downloading' | 'ready'
  needsRestart: boolean
  releaseDate?: string
  version?: string
  progress?: number
  total?: number
  bytesPerSecond?: number
}

export interface AppUpdateOptions {
  checkInterval: number
  allowPrerelease: boolean
  callback: (arg: AppUpdateInfo) => void
}

export interface AppUpdateAPI {
  version(): string
  onUpdate(opts: AppUpdateOptions): void
  restart(): void
}

declare global {
  interface Window {
    appUpdate?: AppUpdateAPI
  }
}

export const appVersion = window.appUpdate
  ? () => window.appUpdate?.version()
  : undefined
