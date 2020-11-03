import { FileCacheArg } from './fileCache.types'
import { sanitize } from 'sanitize-filename-ts'
import { getCacheFolder } from 'platform-folders'
import { readFile, unlink, writeFile, rmdir } from 'fs'
import { join } from 'path'

const cacheRoot = join(getCacheFolder(), 'Sarigama')

function sanePath(dbname: string, id: string): string {
  // Make sure sanitize never evaluates to empty string ''
  return join(
    cacheRoot,
    sanitize(dbname) || 'notEmpty',
    sanitize(id) || 'notEmpty'
  )
}

export function setupFileCache(window: Window) {
  window.fileCache = arg => {
    return new Promise((resolve, reject) => {
      if (arg.method === 'clear') {
        const allPath = join(cacheRoot, sanitize(arg.dbname) || 'notEmpty')
        rmdir(allPath, { recursive: true }, err => {
          if (err && err.code !== 'ENOENT') {
            // we ignore files that are already missing
            reject({ status: 'error', message: err.message })
          } else {
            resolve({ status: 'cleared' })
          }
        })
        return
      }

      const path = sanePath(arg.dbname, arg.id)
      if (arg.method === 'get') {
        readFile(path, (err, buffer) => {
          if (err) {
            reject({ status: 'error', message: err.message })
          } else {
            resolve({ status: 'found', buffer })
          }
        })
      } else if (arg.method === 'put') {
        writeFile(path, arg.file, err => {
          if (err) {
            reject({ status: 'error', message: err.message })
          } else {
            resolve({ status: 'updated' })
          }
        })
      } else if (arg.method === 'delete') {
        unlink(path, err => {
          if (err && err.code !== 'ENOENT') {
            // we ignore files that are already missing
            reject({ status: 'error', message: err.message })
          } else {
            resolve({ status: 'deleted' })
          }
        })
      }

      reject({
        status: 'error',
        message: `invalid method '${(arg as FileCacheArg).method}'`,
      })
    })
  }
}
