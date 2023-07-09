# [myeongjae.kim](https://myeongjae.kim)

## Infrastructure

- Backend (Supabase Self-hosted)
- Frontend (Next.js on Vercel)
    - https://myeongjae.kim

## Coding Convention

### General

- 모든 이름짓기엔 camelCase가 기본이다.
    - 함수는 소문자, 클래스는 대문자로 시작한다.
- 파일
    - `export default`가 리액트 컴포넌트면 파일 이름은 대문자로 시작한다.
- 디렉토리
    - `index.ts`에 `export default`가 리액트 컴포넌트면 디렉토리 이름은 대문자로 시작한다.
- 함수는 화살표 문법 `() => ()` 을 기본으로 사용한다.
    - `function {}`은 `this`바인딩을 활용해야 할 때만 쓴다 (사실상 없다).
- 변수는 `var`를 쓰지 않고 `const`와 `let`으로 선언한다. `const`가 기본이다.
- 문자열을 연결할 때는 템플릿 문법 \`${foo}${bar}\`을 쓴다.

### Typescript

- 타입을 생략하지 않는다. 명시적으로 표시한다.
- 인터페이스, 컴포넌트, 클래스, 타입의 이름은 대문자로 시작한다.
- 변수와 함수는 소문자로 시작한다.

### React

- 컴포넌트의 디렉토리 구조(`**/components/`)는 [Atomic Design](https://brunch.co.kr/@ultra0034/63)을 따른다.
- UI를 구성하는 컴포넌트는 의존성을 최소화하고 외부 의존성은 컨테이너 컴포넌트(`**/containers/`)에서 주입한다.

### Next.js

- 가능한 부분은 모두 SSR(Server Side Rendering)을 사용한다.
- app directory를 사용한다.
