// THIS FILE SHOULD BE KEPT IN SYNC WITH '@lucidogen/useragent'
// UNTIL WE PUBLISH '@lucidogen/useragent' AND CAN IMPORT
// FROM THERE.

export interface AppUpdateAPI {
  version(): string
  onUpdate(
    callback: (arg: { version: string; releaseDate: string }) => void
  ): void
  onProgress(
    callback: (arg: {
      progress: number
      total: number
      bytesPerSecond: number
    }) => void
  ): void
  onReady(callback: (arg: { version: string }) => void): void
  restart(): void
}

declare global {
  interface Window {
    appUpdate?: AppUpdateAPI
  }
}
