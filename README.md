# Ohwitter

###### 개인 프로젝트 진행 시 더욱 빠르고 쉽게 Backend를 구축하기 위해 배워보자 !!

Learning Firebase to make CRUD, Authentication

React with TypeScript

## Firebase

Backend as Service

#### Services

-   Cloud Firestore
-   Firebase ML
-   Cloud Functions
    -   aws lambda와 같이 serverless funtion을 제공
-   Cloud Storage
    -   aws s3와 같이 upload 기능을 제공
-   Hosting
-   Authentication
-   Realtime Database
    -   Firebase original database
-   Crashlytics
-   Performance Monitoring
-   Test Lab
-   App Distribution

#### When to use

-   <b>아이디어를 빠르게 실현하고 테스트하고 싶을 때</b>
-   DB, 회원가입 구현 등 쉽고 빠르다
-   실제 진지한 프로젝트에서는 사용하지 않는다

## Setting

#### React with TypeScript and Sass

```terminal
// for TypeScript
npm create-reate-app ohwitter --template typescript
```

```terminal
// for Sass
yarn eject
rm -rf node_modules
yarn
rn add node-sass sass-loader
```

```js
// line 60 수정
const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(css|scss)$/;
// line 140 추가
{
    loader: require.resolve("sass-loader"),
    options: {
        sourceMap: true
    }
},
```

#### Firebase

1. Create Project
2. Register app with platform
3. npm install

```terminal
npm install --save firebase
npm install --save @types/firebase
```

4. Create Firebase file
```typescript
// Firebase.ts
import firebase from "firebase/app";
import * as config from "./Config";

const firebaseConfig: object = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
};

export default firebase.initializeApp(firebaseConfig);
```

