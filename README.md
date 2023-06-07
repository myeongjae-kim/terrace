# Full Stack Next.js with TypeScript sample (https://myeongjae.kim)

## Infrastructure

- Backend (Supabase Self-hosted)
- Frontend (Nextjs on Heroku)
  - https://myeongjae.kim
    - origin: http://myeongjae-kim-frontend.herokuapp.com
    - alias1: http://heroku.myeongjae.kim (Heroku)
    - alias2: https://heroku-secure.myeongjae.kim (AWS Cloudfront)

## Initialize Githook

```shell
git config core.hooksPath .githooks
```

## 기술 스택

- InversifyJS
- Next.js
  - Server Side Rendering
  - Static Site Generation
- useSSR
- Material UI

## Inversify Convention

- inversify는 도메인 레이어를 보호하는 역할을 한다.
  - UI Layer가 도메인 레이어를 직접 의존(`import`)하지 않게 만들어 유연한 애플리케이션을 구성하도록 도와준다.
  - UI Layer는 `ServiceIdentifier`중에서도 `UseCase` identifier만 사용한다.
- `ServiceIdentifier`는 Symbol로 생성한다.
- `ServiceIdentifier` 변수 이름의 끝은 `Id`로 한다. e.g.) `AxiosId`, `BlogServiceId` `BlogGetUseCaseId`
- inversify 설정은 도메인별로 쪼개서 분리한다.
- inversify 설정을 담은 파일 이름은 `inversify.ts`로 고정한다.
  - 이 파일은 `adapter` 디렉토리의 최상위에 위치한다.
  - 이 설정파일을 module이라 부른다. redux의 ducks 모듈 구조와 비슷하다.
    - 하나의 inversify 모듈은 다음 3개의 구성요소를 갖는다: `ServiceIdentifier`, `decorateClass()`, `bind(container: Container)`
    - `ServiceIdentifier`: 컨테이너에 등록된 서비스 이름.
    - `decorateClass()`: 클래스에 decorator를 직접 붙이는 대신 클래스 바깥에서 붙이는 함수. inversify 프레임워크를 위한 준비 작업이다.
    - `bind(container: Container)`: decorate를 완료한 클래스를 `ServiceIdentifier`에 bind한다.
  - `ServiceIdentifier`는 모듈 안에서 `TYPES`라는 객체 안에 선언한다.
    - 이 중에서 모듈 외부에서 찾을 수 있게 만들고 싶은 `ServiceIdentifier`만 export한다.`
  - `import * as blogModule from "src/blog/adapter/inversify"` 와 같은 형태로 import해서 사용한다.

```typescript
// AdapterId는 모듈 내부에서만 사용하고 UseCaseId들만 export하고 싶을 때
const TYPES = {
  BlogPersistenceAdapterId: Symbol.for("BlogPersistenceAdapter"),
  BlogGetUseCaseId: Symbol.for("BlogGetUseCase"),
  BlogFindAllUseCaseId: Symbol.for("BlogFindAllUseCase"),
  BlogGetPrevOrNextUseCaseId: Symbol.for("BlogGetPrevOrNextUseCase"),
};

export const { BlogGetUseCaseId, BlogFindAllUseCaseId, BlogGetPrevOrNextUseCaseId } = TYPES;
```

## 절대경로에 관해서

`import`를 할 때 `./`나 `../` 없이 바로 경로를 입력하면 자동으로 project의 root에서부터 따라 내려갑니다.

```typescript
// e.g.)
// 현재 파일: src/blog/application/BlogService.ts
// 아래의 두 줄은 완전히 같은 의미다.
import {BlogArticleListResponse} from "../domain/BlogArticleListResponse";
import {BlogArticleListResponse} from "src/blog/domain/BlogArticleListResponse";
```

프로젝트의 모든 코드에 대해서 절대경로를 적용하기 위해 `tsconfig.json`과 `jest.config.js`에 설정을 추가합니다.

### 1. `tsconfig.json`

`tsconfig.json`에 다음 코드를 추가했습니다.

```json
"compilerOptions": {
  "baseUrl": "./"
}
```

### 2. `jest.config.js`

`jest.config.js`에 다음 코드를 추가했습니다.

```json
moduleNameMapper: {
  "^pages/(.*)$": "<rootDir>/pages/$1",
  "^server/(.*)$": "<rootDir>/server/$1",
  "^src/(.*)$": "<rootDir>/src/$1",
}
```

root에 새로운 디렉토리가 추가될 경우 `jest.config.js`에도 반영해야 합니다.

## Coding Convention

### General

- 모든 이름짓기엔 camelCase가 기본이다.
  - 함수는 소문자, 클래스는 대문자로 시작한다.
- 파일
  - `export default`가 리액트 컴포넌트면 파일 이름은 대문자로 시작한다.
  - `export default`가 없는 파일은 kebab-case를 사용한다.
- 디렉토리
  - `index.ts`에 `export default`가 리액트 컴포넌트면 디렉토리 이름은 대문자로 시작한다.
  - `index.ts`에 `export default`가 없는 디렉토리는 kebab-case를 사용한다.
- pages의 하위 디렉토리 및 파일명은 kebab-case로 작성한다(URL path로 사용하기 때문).

- 함수는 화살표 문법 `() => ()` 을 기본으로 사용한다.
  - `function {}`은 `this`바인딩을 활용해야 할 때만 쓴다 (사실상 없다).
- 변수는 `var`를 쓰지 않고 `const`와 `let`으로 선언한다. `const`가 기본이다.
- 문자열을 연결할 때는 템플릿 문법 \`${foo}${bar}\`을 쓴다.

### Typescript

- 타입을 생략하지 않는다. 명시적으로 표시한다.
- 인터페이스, 컴포넌트, 클래스, 타입의 이름은 대문자로 시작한다.
- 변수와 함수는 소문자로 시작한다.

## React

- Functional component를 기본으로 사용한다.
  - state가 필요한 경우 react hooks를 활용한다.
  - `React.useEffect()`로 life cycle을 대체할 수 있으면 클래스를 쓰지 않는다.
- `props`의 필드는 함수 최상단에 구조분해 할당으로 꺼내놓는다.
  - 내부에서 어떤 props를 사용하는지 한 눈에 파악하기 위함.
- 컴포넌트의 디렉토리 구조(`**/components/`)는 [Atomic Design](https://brunch.co.kr/@ultra0034/63)을 따른다.

### 상태관리

현재는 프론트엔드에서 생성/수정/삭제 기능을 제거하고 `useSWR`을 사용하면서 `redux`를 모두 제거했다.

나중에 상태관리 라이브러리가 필요하다면 `recoil`을 고려하기.

- `redux`로 가능한 것은 모두 `recoil`로 가능하다.
  - [https://youtu.be/_ISAA_Jt9kI?t=1516](https://youtu.be/_ISAA_Jt9kI?t=1516)
  - What recoil can do is like a superset of what redux can do.
- Container component(상태 관련)와 presentational compoenent(렌더링)로 나누는 컨벤션은 상태관리 툴과 상관없이 유효하다.
  - [https://youtu.be/_ISAA_Jt9kI?t=1579](https://youtu.be/_ISAA_Jt9kI?t=1579)

아래는 기록용으로 남겨눈다.

#### Redux Convention

- 리듀서와 액션 생성자는 `typesafe-actions` 패키지를 통해서 만든다.
- Ducks구조를 가진 module을 만들어 사용한다. Ducks 구조에서는 한 파일 안에서 다음과 같은 일을 한다:
    1. 액션 타입 정의하기
    2. 액션 생성 함수 만들기
    3. 초기 상태 정의하기
    4. 리듀서 정의하기
    5. Saga 정의하기
- Module파일에서는 `export default`를 사용하지 않는다.
  - Module은 액션 타입, 액션 생성함수, 리듀서, Saga를 `export` 하는데, 이들의 성격이 모두 달라서 이 중 하나에 `default`를 붙이게 되면 `import` 때 혼동이 오게 된다.
- 액션 이름은 모두 대문자를 쓴다.
- 상태를 담는 인터페이스의 이름은 `State`다.
- 액션을 담는 타입의 이름은 `Action`이다.
- 모듈 내부에서 액션은 `actions` 객체 안에 작성한다.
- 컴포넌트를 컨테이너 컴포넌트와 프리젠테이셔널 컴포넌트로 분리한다.
  - `**/components/`: 프리젠테이셔널 컴포넌트
  - `**/containers/`: 컨테이너 컴포넌트
  - `**/state-modules/`: 리덕스 모듈 (ducks구조)
- 상태를 수정할 때는 `immer`로 매번 새로운 객체를 만든다.
- 리듀서 함수의 이름은 `reducer`다.
- 파일 이름
  - 컨테이너 컴포넌트 파일의 이름은 '프리젠테이셔널 컴포넌트' + 'Container'다.
  - 프리젠테이셔널 컴포넌트는 접미사가 붙지 않는다.
