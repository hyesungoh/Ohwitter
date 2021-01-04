## Frontend Develop Log

#### Using interface to props

```tsx
interface someInter {
    someBool: boolean;
    someNum: number;
}

const someCompo = ({ someBool, someNum }: someInter) => {};
```

#### Using Absolute Path

-   Setting

```json
// tsconfig.json
"compilerOptions": {
    "baseUrl": "src", // 추가
    ...
},
```

-   Usage

```tsx
// src/components/Router
import AppRouter from "components/Router";

// src/pages/Auth
import Auth from "pages/Auth";

// src/FBase.ts
import { authService } from "FBase";
```

#### casting object

```tsx
const onClickSocial = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
    const { name } = event.target as HTMLButtonElement;
    console.log(name);
};
```

#### Redirect using react-router-dom

```tsx
import { useHistory } from "react-router-dom";

const someFunc = () => {
    const history = useHistory();
    history.push("/");
};
```

#### setState with function

    - setState 시 함수를 전달하면 이전 값에 접근할 수 있음

```tsx
setSomething((prev) => [newData, ...prev]);
```

#### Inline check

```tsx
// const theFile = files[0];
// it comes Object is possibly 'null' error

const theFile = files?.[0];
```

#### FileReader

```tsx
const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // files == fileList
    const {
        target: { files },
    } = event;
    // prevent Object possibly error
    const theFile = files?.[0];

    const reader = new FileReader();
    // onLoadEnd eventListen
    reader.onloadend = () => {
        // setState result
        setSome(reader.result as string);
    };
    // calling onLoadEnd
    reader.readAsDataURL(theFile as Blob);
};
```

#### UUID

```terminal
npm i uuid
npm i @types/uuid
```

```tsx
import { v4 as uuid } from "uuid";
console.log(uuid()); // it comes OSADIUOASUHDUIWHDIUASNID like that
```
