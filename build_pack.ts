import packager from 'electron-packager'
import { join } from 'path'

async function bundleElectronApp(options: packager.Options) {
  const appPaths = await packager(options)
  const paths: string[] = []
  if (typeof appPaths === 'string') {
    paths.push(appPaths)
  } else {
    paths.push(...appPaths)
  }
  console.log(`Electron app bundles created:\n${paths.join('\n')}`)
}

function local(path: string) {
  return join(__dirname, path)
}

bundleElectronApp({
  name: 'Sarigama',
  icon: local('assets/Icon.icns'), // Windows '.ico', Linux: use the 'icon' option in the BrowserWindow constr.
  dir: local('app'),
  out: local('dist'),
  overwrite: true,
  platform: 'darwin', // 'all'
  prune: false,
  win32metadata: {},
  // MacOS
  appCategoryType: 'public.app-category.education',
  darwinDarkModeSupport: true,
  osxSign: true,
  /*
  osxNotarize: {
    appleId: '',
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  },
  */
  protocols: [
    {
      name: 'Sarigama education application',
      schemes: ['sarigama'],
    },
  ],
  // @ts-ignore
  usageDescription: {
    Camera: 'Needed for QR code login',
    Microphone: 'Needed for musical instrument and voice recording',
  },
})
