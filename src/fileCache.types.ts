// THIS FILE SHOULD BE KEPT IN SYNC WITH '@lucidogen/data'
// UNTIL WE PUBLISH '@lucidogen/data' AND CAN IMPORT
// FROM THERE.
export interface PutFileCache {
  method: 'put'
  dbname: string
  id: string
  file: File
}

export interface GetFileCache {
  method: 'get'
  dbname: string
  id: string
}

export interface DeleteFileCache {
  method: 'delete'
  dbname: string
  id: string
}

export interface ClearFileCache {
  method: 'clear'
  dbname: string
}

export type FileCacheArg =
  | PutFileCache
  | GetFileCache
  | DeleteFileCache
  | ClearFileCache

export interface FoundFileCache {
  status: 'found'
  buffer: Buffer
}

export interface DeletedFileCache {
  status: 'deleted'
}

export interface UpdatedFileCache {
  status: 'updated'
}

export interface ClearedFileCache {
  status: 'cleared'
}

export interface ErrorFileCache {
  status: 'error'
  message: string
}

export type FileCacheResult =
  | FoundFileCache
  | DeletedFileCache
  | UpdatedFileCache
  | ClearedFileCache
  | ErrorFileCache

export interface DiskFileCache {
  (arg: FileCacheArg): Promise<FileCacheResult>
}

declare global {
  interface Window {
    SARIGAMA_APP: string
    // Removed as soon as setup is run. Not present when running from
    // normal browser.
    fileCache?: DiskFileCache
  }
}
