// See: https://medium.com/@TwitterArchiveEraser/notarize-electron-apps-7a5f988406db
import { AfterPackContext } from 'electron-builder'
import { notarize } from 'electron-notarize'
import { existsSync } from 'fs'
import { join } from 'path'

export function afterSign({ appId }: { appId: string }) {
  return async function afterSign(params: AfterPackContext) {
    // Only notarize the app on Mac OS only.
    if (process.platform !== 'darwin') {
      return
    }

    const appPath = join(
      params.appOutDir,
      `${params.packager.appInfo.productFilename}.app`
    )

    if (!existsSync(appPath)) {
      console.log(`Cannot find application at: ${appPath}`)
      console.log(params)
      throw new Error(`Cannot find application at: ${appPath}`)
    }

    console.log(`Notarizing ${appId} found at ${appPath}`)

    try {
      await notarize({
        appBundleId: appId,
        appPath: appPath,
        appleId: 'pay@lucidogen.io',
        appleIdPassword: '@keychain:AC_PASSWORD',
      })
    } catch (error) {
      console.error(error)
    }

    console.log(`Done notarizing ${appId}`)
  }
}
