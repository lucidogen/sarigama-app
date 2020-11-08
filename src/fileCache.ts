import { existsSync, mkdirSync, readFile, rmdir, unlink, writeFile } from 'fs'
import { join } from 'path'
import { getCacheFolder } from 'platform-folders'
import { sanitize } from 'sanitize-filename-ts'
import { FileCacheAPI } from './fileCache.types'

const cacheRoot = join(getCacheFolder(), 'Sarigama')

/// THIS RUNS IN THE RENDER PROCESS DURING PRELOAD, USING CONTEXT BRIDGE ////

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
    put(dbname, id, url) {
      const path = sanePath(dbname, id)
      return new Promise(resolve =>
        fetch(url)
          .then(response => {
            response.arrayBuffer().then(buffer => {
              writeFile(
                path,
                Buffer.from(buffer),
                { encoding: 'binary' },
                err => {
                  resolve(err ? { error: err.message } : {})
                }
              )
            })
          })
          .catch(err => resolve({ error: err.message }))
      )
    },
    get(dbname, id) {
      const path = sanePath(dbname, id)
      return new Promise(resolve =>
        readFile(path, async (err, buffer) => {
          if (err) {
            resolve({ error: err.message })
          } else {
            // FIXME: BAD DESIGN: createObjectURL not with revokeObjectURL
            // revoke has to be called on recipient !!
            resolve({ url: URL.createObjectURL(new Blob([buffer])) })
          }
        })
      )
    },
    remove(dbname, id) {
      const path = sanePath(dbname, id)
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
