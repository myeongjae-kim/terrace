# Full Stack Next.js with TypeScript sample (https://myeongjae.kim)

## Initialize local database

```bash
docker-compose up
npm run db
mysql -u root -p # password is 'secret'

CREATE DATABASE myeongjaekim
GRANT ALL PRIVILEGES ON database_name.* TO 'mariadb'@'%'

# exit to local
npm run migrate
```

## 기술 스택

- Server Side Rednering with Next.js
- Cache rendering
- Redux
  - Redux Saga
  - typesafe-actions
  - immer
- Reselect
- Material UI
- inversify
- inversify-express-utils
- Type ORM
- CI/CD with Docker and AWS.

## 환경변수에 대해서

환경변수는 두 곳에서 관리합니다.

1. `.node_env`
2. `.browser_env`

`.node_env`의 값들은 서버에서만 접근 가능하고, `.browser_env`의 값들은 브라우저에서만 접근 가능합니다. 이로써 사용자에게 숨겨야할 값을 브라우저에 노출하지 않을 수 있습니다.

`.browser_env`의 값들은 `next.config.js`를 통해 주입됩니다. 

`env`파일들의 값들은 `build.sh`, `dev.sh`에서 시스템 환경변수에 등록됩니다.

`.node_env`, `.browser_env`파일은 git에 등록하지 않고 환경변수들은 배포 파이프라인에서 넣어줍니다.

## 절대경로에 관해서

`import`를 할 때 `./`나 `../` 없이 바로 경로를 입력하면 자동으로 project의 root에서부터 따라 내려갑니다.

```typescript
// e.g.)
// 현재 파일: server/file/files/api/FileController.ts
// 아래의 두 줄은 완전히 같은 의미다.
import ApiError from "../../../../lib/api/common/ApiError";
import ApiError from "lib/api/common/ApiError";
```

프로젝트의 모든 코드에 대해서 절대경로를 적용하기 위해 3곳에서 설정이 필요합니다. 프로젝트에는 3개의 환경이 존재하기 때문입니다.

1. Nextjs
2. Nodejs
3. Jest

### 1. Nextjs

`next.config.js`에 다음 코드를 추가했습니다.

```javascript
webpack(config, options) {
  config.resolve.modules.push(path.resolve('./'))
  return config
}
```

`tsconfig.json`에 다음 코드를 추가했습니다.

```json
"compilerOptions": {
  "baseUrl": "./"
}
```

### 2. Nodejs

`server/tsconfig.json`에 다음 코드를 추가했습니다.

```json
"compilerOptions": {
  "baseUrl": "../"
}
```

`tsconfig-paths` 패키지를 추가하고, 서버를 실행할 때 다음과 같이 합니다.

```bash
node -r tsconfig-paths/register server # dev
NODE_ENV=production node -r tsconfig-paths/register server #production
```

### 3. Jest

`jest.config.js`에 다음 코드를 추가했습니다.

```json
moduleNameMapper: {
  "^lib/(.*)$": "<rootDir>/lib/$1",
  "^pages/(.*)$": "<rootDir>/pages/$1",
  "^server/(.*)$": "<rootDir>/server/$1",
  "^tests/(.*)$": "<rootDir>/tests/$1",
  "^ui/(.*)$": "<rootDir>/ui/$1"
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
  - `function {}`은 `this`바인딩을 활용해야 할 때만 쓴다.
- 변수는 `const`, `let`으로 선언한다. `const`가 기본이다.
- 문자열을 연결할 때는 템플릿 문법 \`${foo}${bar}\`을 쓴다.

### Typescript

- 타입은 되도록 명시적으로 표시한다.
- tslint를 사용한다.
- 인터페이스, 컴포넌트, 클래스, 타입의 이름은 대문자로 시작한다.
- 변수와 함수는 소문자로 시작한다.

## React

- `render()` 혹은 Functional component 안에서 사용하는 `props`의 필드는 함수 최상단에 구조분해 할당으로 꺼내놓는다.
    - 내부에서 어떤 props를 사용하는지 한 눈에 파악하기 위함.
- 컴포넌트의 디렉토리 구조(`**/components/`)는 [Atomic Design](https://brunch.co.kr/@ultra0034/63)을 따른다.
- Functional component를 기본으로 사용한다.
  - state가 필요한 경우 react hooks를 활용한다.
  - `React.useEffect()`로 life cycle을 대체할 수 있으면 클래스를 쓰지 않는다.

### Redux

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
