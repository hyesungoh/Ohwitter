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
npx create-reate-app ohwitter --template typescript
```

```terminal
// for Sass
yarn eject
rm -rf node_modules
yarn
yarn add node-sass sass-loader
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

## Develop

-   #### Firebase Authentication setting

```ts
// FBase.ts
import "firebase/auth";

...
export const authService: firebase.auth.Auth = firebase.auth();
```

```tsx
// somewhere.tsx
import { authService } from "FBase";
```

-   #### Get current user

```tsx
// User | null
authService.currentUser;
```

-   #### Sign In setting

![img](https://user-images.githubusercontent.com/26461307/103371869-e138f400-4b13-11eb-96bb-65eaec2ffd8d.png)

-   #### Sign In with github setting (Create new OAuth Apps)

![github](https://user-images.githubusercontent.com/26461307/103374372-c918a300-4b1a-11eb-92e3-964403a3b66c.png)

-   #### Create User or Sign In With Email and Password

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

-   #### Auth state Persistence

| Value           | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| local (Default) | 브라우저가 닫혀도 상태가 유지됨. 상태 삭제를 원할 시 명시적으로 로그아웃해야함. |
| session         | 현재 세션, 탭에서만 상태가 유지됨. 인증된 탭이 닫힐 시 삭제됨.                  |
| none            | 상태가 메모리에만 저장됨. 활동이 새로고침되면 삭제됨.                           |

-   #### onAuthStateChanged
    -   eventListener 속성을 가지며 Firebase init, sign in, up, out시 trigger

```tsx
useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setInit(true);
    });
}, []);
```

-   #### Social Log In
    -   provider을 생성, 사용하여 간단하게 구현 가능

```tsx
const onClickSocial = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
    const { name } = event.target as HTMLButtonElement;

    let provider: any;
    if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
};
```

-   #### Sign Out

```tsx
// firebase.auth().signOut();
authService.signOut();
```

-   #### Create Database

![스크린샷 2021-01-03 오후 6 16 47](https://user-images.githubusercontent.com/26461307/103475377-fce01b00-4def-11eb-8b4f-509d3d71a19d.png)

```terminal
asia-northeast1 === Tokyo
asia-northeast2 === Osaka
asia-northeast3 === Seoul
```

```ts
import "firebase/firestore";
...

export const dbService: firebase.firestore.Firestore = firebase.firestore();
```

-   #### Cloud Firestore

    -   `NoSQL`
        -   `Collection`
        -   `Documents`
    -   `Collection`은 `Documents`의 그룹
    -   Realtime

-   #### Create Documents
    -   `firebase.firestore().collection("COLLECTION NAME").add(SOMETHING)`

```tsx
const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService.collection("COLLECTION NAME").add({
        // something you want
    });
};
```

-   #### Read Documents
    -   `firebase.firestore().collection("COLLECTION NAME").get()`

```tsx
const getSomething = async () => {
    const data: firebase.default.firestore.QuerySnapshot = await dbService
        .collection("someCollection")
        .get();

    data.forEach((doc: firebase.default.firestore.QueryDocumentSnapshot) => {
        const someObject = {
            ...doc.data(),
            id: doc.id,
        };

        setSomething((prev) => [someObject, ...prev]);
    });
};
```

-   #### Checking writer

```tsx
authService.onAuthStateChanged((user) => {
    console.log(user + "<<< This is your user !!");
});
```

-   #### onSnapshot
    -   eventListener 속성을 가지며 해당 collection이 init, create, update, delete될 때를 감지
    -   `firebase.firestore().collection("COLLECTION NAME").onSnapshot()`

```tsx
dbService.collection("someCollection").onSnapshot((snapshot) => {
    const someArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // something you want
    }));
    setSomething(ohweetsArray);
});
```

-   #### Delete Documents
    -   `firebase.firestore().doc("COLLECTION NAME/DOC ID").delete()`

```tsx
const onDelete = async () => {
    const isOk = window.confirm("Are you sure?");
    if (isOk) {
        await dbService.doc(`someCollection/${someDoc.id}`).delete();
    }
};
```

-   #### Update Documents
    -   `firebase.firestore().doc("COLLECTION NAME/DOC ID").update({updateTable: data})`

```tsx
const onUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService.doc(`someCollection/${someDoc.id}`).update({
        text: newText,
    });
    setIsEdit(false);
};
```

-   #### Using Firebase Storage

```ts
import "firebase/storage";
...

export const storageService: firebase.storage.Storage = firebase.storage();
```

-   #### Upload image with create reference

```tsx
// storageService.ref().child("REFERENCE NAME/FILE NAME")
const fileRef = storageService.ref().child(`${userObj?.uid}/${uuid()}`);
// fileRef.putString(file data, data classification);
const response = await fileRef.putString("FILE URL", "data_url");
```

-   #### Get download URL

```tsx
fileURL = await response.ref.getDownloadURL();
```

-   #### Delete Image with find reference

```tsx
await storageService.refFromURL(obj.fileURL).delete();
```

-   #### Get data using where
    -   where을 이용하여 필터링 가능

```tsx
const func = async () => {
    const datas = await dbService
        .collection("COLLECTION_NAME")
        .where("something", "==", someObj?.uid)
        .get();
};
```

-   #### sorting data

```tsx
const datas = await dbService
    .collection("COLLECTION_NAME")
    .where("something", "==", someObj?.uid)
    .orderBy("createdAt", "desc");
// or .orderBy("createdAt", "asc");
```

-   #### Using query
    -   error에 나온 url을 이용하여 index를 생성하여 사용 가능

```tsx
const func = async () => {
    const datas = await dbService
        .collection("COLLECTION_NAME")
        .where("something", "==", someObj?.uid)
        .orderBy("createdAt")
        .get();
};
```

-   #### Firebase user with more detail

    -   firestore에 user collection을 이용하면 기본적으로 제공되는 authentication외의 다양한 정보를 저장, 사용 가능

-   #### Update Profile

    -   firebase의 updateProfile method는 displayName, photoUrl만 변경이 가능

```tsx
await userObj?.updateProfile({
    displayName: newName,
    photoURL: someURL,
});
```

-   #### Security of API key
        - browser key setting에 doamin을 추가하여 다른 domain에서 접근하는 것을 막을 수 있음
        - 배포, localhost, firebaseapp domain을 추가하면 됨
    ![스크린샷 2021-01-24 오후 8 09 30](https://user-images.githubusercontent.com/26461307/105628501-a743df00-5e80-11eb-9284-785a091123d9.png)
