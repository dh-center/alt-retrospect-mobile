# alt-retrospect-mobile
![CI](https://github.com/dh-center/alt-retrospect-mobile/workflows/Install%20and%20test/badge.svg)

## How to run
- Create `.env` file in the root directory
- Place the following content into the `.env` file:
```
IOS_GM_API_KEY=<Google Maps API key for iOS>
ANDROID_GM_API_KEY=<Google Maps key for Android>
GM_DIRECTIONS_API_KEY=<Google Maps key for Directions API>
```
- Run `npm install` in the root directory
- For iOS, you may need to run additionally `cd ios && pod install`
- Run `npm run-ios` or `npm run-android` in the root directory to lauch on an Android/iOS app/emulator
