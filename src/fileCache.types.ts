// THIS FILE SHOULD BE KEPT IN SYNC WITH '@lucidogen/data'
// UNTIL WE PUBLISH '@lucidogen/data' AND CAN IMPORT
// FROM THERE.

export interface FileCacheResult {
  error?: string
  buffer?: Buffer
}

export interface FileCacheAPI {
  put(dbname: string, id: string, file: File): Promise<FileCacheResult>
  get(dbname: string, id: string): Promise<FileCacheResult>
  remove(dbname: string, id: string): Promise<FileCacheResult>
  clear(dbname: string): Promise<FileCacheResult>
}

declare global {
  interface Window {
    SARIGAMA_APP: string
    // Removed as soon as setup is run. Not present when running from
    // normal browser.
    fileCache?: FileCacheAPI
  }
}
