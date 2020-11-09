import * as builder from 'electron-builder'
import { afterSign } from './afterSign'
// const Platform = builder.Platform
const productName = 'Sarigama'
const appId = 'io.sarigama.app'

// to build on Windows
// env CSC_KEY_PASSWORD=[PASSWORD HERE] GH_TOKEN=[sarigama-deploy token] npm run build

// const isMac = process.platform === 'darwin'
const publish = process.argv[2] === 'deploy' ? 'always' : 'never'

// Promise is returned
async function buildApp() {
  await builder
    .build({
      /*
      targets: isMac
        ? Platform.MAC.createTarget()
        : Platform.WINDOWS.createTarget(),
        */
      publish,
      config: {
        productName,
        appId,
        files: 'app/**/*',
        mac: {
          hardenedRuntime: true,
          entitlements: './misc/entitlements.mac.inherit.plist',
          category: 'public.app-category.education',
        },
        win: {
          target: 'nsis',
          icon: 'build/icon.ico',
          cscLink:
            'D:\\Dropbox\\_LUCIDOGEN\\SARIGAMA-SECURITY\\sectigo_certificate.pfx',
        },
        afterSign: afterSign({ appId }),
        forceCodeSigning: true,
        publish: {
          provider: 'github',
        },
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
