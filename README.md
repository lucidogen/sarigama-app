# Sarigama

The electron application for [Sarigama](https://sarigama.io).

## Publish

Make sure to set `version` in package.json.

Commit, push and deploy:

```bash
npm run deploy
```

Until signing works for Windows from mac, also release from windows:

```bash
git pull
npm run deploy
```

Finish release on github website.

## Mac deploy setup information

Create a signing request: [info](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Create certificate (Developer ID Application, Developer ID Installer) [here](https://developer.apple.com/account/resources/certificates/list)

Download, double-click to install, login keychain

Open XCode, accounts + add Apple ID

In Keychain, login, click "+" to add password, "AC_PASSWORD", "apple id email", "the password"...

Set GH_TOKEN in env (create from sarigama-deploy user, package read/write rights).
