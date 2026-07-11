# terrace

글(`blog`), 일상 기록(`daily`), 문장 수집(`musings`), 장소와 소개 페이지를 제공하고 소유자 전용 관리 화면에서 콘텐츠를 발행하는 TanStack Start 애플리케이션입니다.

## Architecture

terrace는 핵심 의존성 방향을 지키는 **실용적 모듈러 모놀리스**입니다. 기능별 core와 명시적인 port/adapter 경계를 사용하지만, 개인 사이트와 단일 배포 단위에 필요하지 않은 별도 서비스나 DTO 계층은 만들지 않습니다.

기본 원칙은 다음과 같습니다.

- **Screaming Architecture**: 핵심 구조는 `article`, `auth`, `musings`처럼 제품 기능을 먼저 드러냅니다.
- **Port and Adapter Architecture**: 정책과 계약은 `src/core`, DB·Google OAuth·JWT 같은 외부 I/O는 `src/infrastructure`가 소유합니다.
- **Core는 객체지향**: application service가 in-port를 구현하고 out-port와 협력해 정책을 수행합니다.
- **Web 영역은 얇게**: route와 server function은 검증, 인증, 요청/응답 변환, use case 호출만 담당합니다.

실용성을 위해 core 모델을 내부 UI 계약으로 재사용하고, route 여러 곳에서 쓰는 server function을 `src/features`에 둘 수 있습니다. 이 선택은 의존성 방향을 바꾸지 않는 범위에서만 허용합니다. core는 React, TanStack Start, Drizzle, DB schema, 외부 SDK, infrastructure를 알지 못합니다.

## Directory Layout

```txt
src/
  core/
    {feature}/
      domain/                 # 식별자, 값 타입, 핵심 모델
      application/
        *Service.ts           # use case 정책
        port/in/              # 웹 계층이 호출하는 use case 인터페이스
        port/out/             # application이 필요로 하는 I/O 인터페이스
    common/                   # 공통 domain/application 모델
    config/                   # DI token 타입과 @Autowired
  infrastructure/
    {feature}/adapter/        # Drizzle, OAuth, JWT 구체 구현
    config/                   # DI wiring, server environment, typed getUseCase
  features/                   # 제품별 웹 기능, server function, presentation 계산
  components/                 # 공유 및 관리자 UI
  routes/                     # TanStack Start file routes
  config/                     # client-visible runtime configuration
  db/                         # Drizzle 연결과 schema source of truth
  integrations/               # TanStack Query 등 기술 통합
  themes/                     # Astryx 테마
  styles/                     # 전역/호환 스타일
```

## Core Boundary

의존성은 항상 core를 향합니다.

```txt
routes / features / components
              |
              v
core/{feature}/application/port/in
              |
              v
core/{feature}/application service
              |
              v
core/{feature}/application/port/out
              ^
              |
infrastructure/{feature}/adapter
```

core application service는 콘텐츠 생성·수정·발행 여부, 소유자 확인, slug 중복 같은 제품 규칙을 소유합니다. adapter는 DB 조회/반영, 외부 SDK 호출, persistence row와 core model 사이 mapping만 담당합니다.

새 기능을 추가할 때 다음을 지킵니다.

- 웹이나 외부에서 호출할 동작은 `application/port/in`에 둡니다.
- DB나 SDK가 필요한 동작은 `application/port/out` 뒤에 숨깁니다.
- concrete adapter와 실제 wiring은 `src/infrastructure`에 둡니다.
- DB inferred row type을 core model이나 in-port 계약으로 노출하지 않습니다.

## Web Boundary

`src/routes`는 공식 TanStack Start file routing 규약을 따르는 inbound adapter입니다. route 파일은 loader, head metadata, route-level redirect, component wiring을 담당합니다. `src/routeTree.gen.ts`는 생성 파일이므로 직접 편집하지 않습니다.

`src/features`는 terrace의 웹 기능 경계입니다.

- 여러 route/component에서 공유하는 server function과 화면용 순수 계산을 기능별로 둡니다.
- 모든 server function 입력은 Zod 등 런타임 schema로 검증합니다.
- 조회는 `GET`, 상태 변경과 cookie 변경은 `POST`를 사용합니다.
- server function은 out-port, DB, concrete adapter, DI container를 직접 호출하지 않습니다.
- use case는 `src/infrastructure/config/getUseCase.ts`의 typed `getUseCase`로만 얻습니다.
- route와 component는 server-only infrastructure를 직접 import하지 않고 server function을 통해 기능을 주입받습니다.

TanStack Start의 root route는 document shell과 전역 provider를 소유하며 `HeadContent`, `Scripts`, child route outlet을 유지합니다.

## Authentication

소유자 인증은 `auth` core와 `owner-auth` 웹 기능으로 나눕니다.

- Google credential 검증과 세션 서명/검증 계약은 core가 소유합니다.
- Google SDK와 JOSE 구현은 infrastructure adapter에 둡니다.
- cookie read/write, login redirect, server function middleware는 `src/features/owner-auth`에 둡니다.
- 관리자 mutation은 `createOwnerServerFn`을 사용해 서버에서 세션을 다시 검증합니다.
- secret과 server environment는 client bundle에서 import할 수 없는 `*.server.ts` 모듈에 둡니다.

## Data and Schema

DB schema의 source of truth는 `src/db/schema.ts`입니다.

- 새 테이블의 물리 이름은 단수형으로 둡니다.
- table 변수는 `{name}Table` 패턴을 사용합니다.
- 기존 `musings` 테이블은 운영 호환성을 위해 물리 이름을 유지하되 코드 변수는 `musingTable`을 사용합니다.
- adapter가 persistence row를 core model로 mapping합니다.
- HTTP 경로, 공개 URL/slug, DB schema는 외부 계약이므로 구조 개선 중 임의로 깨뜨리지 않습니다.

## UI

UI는 Astryx를 기본 디자인 시스템으로 사용합니다.

- 새 화면은 먼저 `pnpm exec astryx build "<idea>"`로 kit을 탐색합니다.
- 전체 화면은 `AppShell` 또는 `Layout`, 탐색은 `SideNav`/`TopNav` 등 컴포넌트 구조를 우선합니다.
- layout과 spacing은 Astryx component props와 token 기반 utility를 사용합니다.
- raw 색상값이나 임의의 디자인 토큰을 만들지 않습니다.
- dense data는 Table/List row를 사용하고, Card를 반복 행 wrapper로 사용하지 않습니다.

## Architecture Checks

`scripts/check-architecture.sh`가 다음 회귀를 검사합니다.

- `src/core`의 infrastructure, DB, React/TanStack, Drizzle, 외부 SDK import
- route/feature/component의 out-port, DB, concrete adapter, DI container 직접 접근
- client 영역의 `*.server.ts` 직접 import

일상 검증:

```bash
/opt/homebrew/bin/pnpm lint
/opt/homebrew/bin/pnpm test
/opt/homebrew/bin/pnpm build
/opt/homebrew/bin/pnpm find-deadcode
```

`pnpm lint`는 Biome, TypeScript, architecture check를 함께 실행합니다.

## References

- [TanStack Start routing guide](https://tanstack.com/start/latest/docs/framework/react/guide/routing)
- [Next.js 풀스택과 Serverless 백엔드 아키텍처 제안](https://myeongjae.kim/blog/2026/02/14/nextjs-fullstack-and-serverless-backend-architecture-proposal)
- [Hierarchical Controller Package Structure](https://johngrib.github.io/wiki/article/hierarchical-controller-package-structure/)
