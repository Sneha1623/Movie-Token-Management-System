# Android APK Setup

The project is configured with Capacitor. The Android wrapper is in the `android` folder.

Before building for a real Android phone, update the backend URL in:

```text
js/config.js
```

For a real phone, do not use `localhost`, because `localhost` means the phone itself. Use one of these:

```js
window.APP_CONFIG = {
    API_BASE: "http://YOUR-LAPTOP-IP:5000/api"
};
```

or a hosted backend URL:

```js
window.APP_CONFIG = {
    API_BASE: "https://your-backend-domain.com/api"
};
```

Build steps:

```powershell
npm run android:sync
npm run android:open
```

Android Studio can then build and run the app on an emulator or connected Android phone.

Command-line debug APK build:

```powershell
npm run android:build
```

APK output path:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Current machine note:

- Java 25 is too new for this Gradle build.
- Java 24 worked better, but the Android SDK is not installed/found yet.
- Install Android Studio, open SDK Manager once, and install the Android SDK before building.
