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
{
    "compilerOptions": {
        "baseUrl": "src",
        ...
    },
    "include": ["src"]
}
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
