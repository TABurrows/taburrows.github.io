---
title: "Firebase: Setup for Web Development"
summary: "Notes on setting up Firebase for Web Development with the Firebase JavaScript SDK"
tags: [ "Firebase", "JavaScript", "Firebase JavaScript SDK", "Setup" ]
---

First steps:
- Create a Firebase Project
    - Optionally configure Google Analytics for the Project
- Register your application with the Firebase Project
    - In the Firebase Console overview page, click the `Web` icon `</>` to launch the setup workflow
    - `Add app`
    - Specify a nickname (the internal, convenience identifier which is only visible in the Firebase Console)
    - `Register app`
    - Follow the on-screen instructions for adding, initializing and utilizing the Firebase SDK


[Firebase App Samples](https://firebase.google.com/docs/samples)


Install the Firebase CLI: 

```
npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools
```


After installing the Firebase CLI, authenticate with:

```
firebase login
```



### TypeScript

You can build with TypeScript either by using the automatic transpilation at initialization `firebase init functions` or you can transpile existing TypeScript source code to JavaScript at deploy time via a predeploy hook.