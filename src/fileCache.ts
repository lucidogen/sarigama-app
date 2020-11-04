import { existsSync, mkdirSync, readFile, rmdir, unlink, writeFile } from 'fs'
import { join } from 'path'
import { getCacheFolder } from 'platform-folders'
import { sanitize } from 'sanitize-filename-ts'
import { FileCacheAPI } from './fileCache.types'

const cacheRoot = join(getCacheFolder(), 'Sarigama')
console.log('CacheRoot', cacheRoot)

function sanePath(dbname: string, id?: string): string {
  // Make sure sanitize never evaluates to empty string ''
  const folder = join(cacheRoot, sanitize(dbname) || 'notEmpty')
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true })
  }
  return id ? join(folder, sanitize(id) || 'notEmpty') : folder
}

export function fileCacheAPI(): FileCacheAPI {
  return {
    put(dbname, id, file) {
      const path = sanePath(dbname, id)
      console.log('put', path)
      return new Promise(resolve =>
        writeFile(path, file, err => resolve(err ? { error: err.message } : {}))
      )
    },
    get(dbname, id) {
      const path = sanePath(dbname, id)
      console.log('get', path)
      return new Promise(resolve =>
        readFile(path, (err, buffer) =>
          resolve(err ? { error: err.message } : { buffer })
        )
      )
    },
    remove(dbname, id) {
      const path = sanePath(dbname, id)
      console.log('remove', path)
      return new Promise(resolve =>
        unlink(path, err =>
          resolve(err && err.code !== 'ENOENT' ? { error: err.message } : {})
        )
      )
    },
    clear(dbname) {
      const allPath = sanePath(dbname)
      console.log('clear', allPath)
      return new Promise(resolve =>
        rmdir(allPath, { recursive: true }, err =>
          resolve(err && err.code !== 'ENOENT' ? { error: err.message } : {})
        )
      )
    },
  }
}
