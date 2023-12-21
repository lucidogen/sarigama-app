# Build and deploy of desktop app

## Build

These commands build and push the new version to github in a draft release.

**Setup**

Change `version` in **package.json** respecting semver. Update to latest electron, commit, push changes.

On each platform, `git pull` and `npm install` before build.

Note: `GH_TOKEN` and `CSC_KEY_PASSWORD` are stored in [Lucidogen vault](https://app.gitbook.com/@lucidogen/s/security/). `certificate_win.pfx` is also in vault.

**Windows**

Replace `[ ... PATH ...] below with the path to the servers settings folder.`

```
env CSC_LINK=[ ... PATH ... ]\\SARIGAMA-SECURITY\\certificate_win.pfx CSC_KEY_PASSWORD=[ CSC_KEY_PASSWORD ] GH_TOKEN=[ GH_TOKEN ] npm run deploy
```

**Mac**

```
env GH_TOKEN=[ GH_TOKEN HERE ] npm run deploy
```

**Linux (on mac):**

```
env GH_TOKEN=[ GH_TOKEN HERE ] npm run deploy:linux
```

#### Mac deploy setup information

Create a signing request: [info](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates).

Create certificate (Developer ID Application, Developer ID Installer) [here](https://developer.apple.com/account/resources/certificates/list).

Download, double-click to install, login keychain

Open XCode, accounts + add Apple ID

In Keychain, login, click "+" to add password, "AC\_PASSWORD", "apple id email", "the password"...

Set `GH_TOKEN` on build (created from sarigama-deploy user, package read/write rights)

## Deploy

Once all three builds are on [sarigama-app/releases](https://github.com/lucidogen/sarigama-app/releases) (9 Assets), edit release information. Format is:

```
* new feature
* other feature
```

Hit **publish** and the new version will be automatically updated.

Change download to point to the latest version (stable user password is in Lucidogen vault).

{% hint style="warning" %}
There are two version numbers to change on each redirect.
{% endhint %}

```
ssh stable@download.sarigama.io
sudo vim /etc/nginx/sites-available/download.sarigama.io
```

Save and reload nginx `sudo systemctl reload nginx`.

Test download: [mac](https://download.sarigama.io/mac), [windows](https://download.sarigama.io/windows), [linux](https://download.sarigama.io/linux).

Done !
