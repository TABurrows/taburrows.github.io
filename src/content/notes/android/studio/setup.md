---
title: "Android: Studio Setup"
summary: "Quick installation notes for Android Studio"
tags: [ "Android", "Studio" ]
---

Follow the online documentation for the latest Android Studio setup steps.

## Debian

First download the latest Android Studio `.tar.gz` file from `developer.android.com/studio`:

```shell
# Unzip the tarball
tar -zxvf android-studio-*.tar.gz

# Move the uncompressed folder to its shared location
sudo mv android-studio /opt

# Install dependencies
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386

# Run the installer
cd /opt/android-studio/bin
./studio.sh
```

Notes:
- Android SDK default location is `~/Android/Sdk`


To configure the path and necessary environment variables:

```shell
echo "export ANDROID_HOME=~/Android/Sdk" >> ~/.bashrc
echo "export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator" >> ~/.bashrc
echo "alias android='/opt/android-studio/bin/studio.sh'" >> ~/.bashrc
echo "alias phone='emulator -avd Medium_Phone_API_35'" >> ~/.bashrc
source ~/.bashrc
echo $PATH
```

To get a list of installed emulators:
```
emulator -list-avds
```

To launch an emulator version:
```
emulator -avd Medium_Phone_API_35
```

Or to launch your preferred emulator through the above defined alias:
```
phone
``

