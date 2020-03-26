import * as builder from 'electron-builder'
import { afterSign } from './afterSign'
const Platform = builder.Platform
const productName = 'Sarigama'
const appId = 'io.sarigama.app'

// to build on Windows
// env CSC_KEY_PASSWORD=[PASSWORD HERE] npm run make

const isMac = process.platform === 'darwin'

// Promise is returned
async function buildApp() {
  await builder
    .build({
      targets: isMac
        ? Platform.MAC.createTarget()
        : Platform.WINDOWS.createTarget(),
      config: {
        productName,
        appId,
        files: 'app/**/*',
        mac: {
          hardenedRuntime: true,
          entitlements: './misc/entitlements.mac.inherit.plist',
          category: 'public.app-category.education',
          target: ['dmg'],
        },
        win: {
          target: 'nsis',
          icon: 'build/icon.ico',
          cscLink:
            'D:\\Dropbox\\_LUCIDOGEN\\SARIGAMA-SECURITY\\sectigo_certificate.pfx',
        },
        afterSign: afterSign({ appId }),
      },
    })
    .then(r => {
      console.log('DONE', r)
    })
    .catch(error => {
      console.error(error)
    })
}

buildApp()
