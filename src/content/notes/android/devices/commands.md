---
title: "Android: Device Commands"
summary: "A short reference guide to Android Device Commands" 
tags: [ "Android", "Commands" ]
---


## adb

To use a physical Android phone, turn the device into `Debug` mode, plugin in the phone via USB and use the `adb` command to control.

- `adb install package.apk` - installs a given package
- `adb uninstall package.apk` - uninstalls a given package
- `adb push /home/file /sdcard/file` - pushes a file up to the device's sdcard
- `adb pull /sdcard/file /home/file` - pulls a file down from the device's sdcard
- `adb logcat` - cat the device's log output
- `adb shell` - launch an interactive command line shell on the device
- `adb shell command` - runs a given command on the device's interactive shell 

## Emulator

To get a list of installed emulators:

```
emulator -list-avds
```

To launch an emulator version:

```
emulator -avd Medium_Phone_API_35
```
