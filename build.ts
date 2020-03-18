import * as builder from 'electron-builder'
import { afterSign } from './afterSign'
const Platform = builder.Platform
const productName = 'Sarigama'
const appId = 'io.sarigama.app'

// Promise is returned
async function buildApp() {
  await builder
    .build({
      targets: Platform.MAC.createTarget(),
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
