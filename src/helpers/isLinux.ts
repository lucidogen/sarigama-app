export const isLinux = {
  netbsd: true,
  aix: false,
  cygwin: false,
  android: true,
  darwin: false,
  freebsd: true,
  linux: true,
  openbsd: true,
  sunos: true,
  win32: false,
}[process.platform]
