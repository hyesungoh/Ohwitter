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

#### Develop

-   ##### Firebase Authentication setting

```ts
// FBase.ts
...
import "firebase/auth";

...
export const authService = firebase.auth();
```

```tsx
// somewhere.tsx
import { authService } from "FBase";
```

-   ##### get current user

```tsx
// User | null
authService.currentUser;
```

-   ##### Sign In setting

![img](https://user-images.githubusercontent.com/26461307/103371869-e138f400-4b13-11eb-96bb-65eaec2ffd8d.png)

-   ##### Sign In with github setting (Create new OAuth Apps)

![스크린샷 2020-12-31 오전 2 55 41](https://user-images.githubusercontent.com/26461307/103371852-d54d3200-4b13-11eb-8c2c-4995ebbcc431.png)

-   ##### Create User or Sign In With Email and Password

```tsx
const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
        if (newAccount) {
            await authService.createUserWithEmailAndPassword(email, password);
        } else {
            await authService.signInWithEmailAndPassword(email, password);
        }
    } catch (error) {
        console.log(error);
    }
};
```

-   ##### Auth state Persistence

| Value   | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| local (Default) | 브라우저가 닫혀도 상태가 유지됨. 상태 삭제를 원할 시 명시적으로 로그아웃해야함. |
| session | 햔재 세션, 탭에서만 상태가 유지됨. 인증된 탭이 닫힐 시 삭제됨.                  |
| none    | 상태가 메모리에만 저장됨. 활동이 새로고침되면 삭제됨.                           |
