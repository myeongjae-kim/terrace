<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the tanstack-start you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in  https://tanstack.com/start/latest/docs/framework/react/guide/routing before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tooling-agent-rules -->
# Tooling

Use the pnpm executable from the user's normal shell environment for pnpm commands in this repository, not the Codex bundled runtime pnpm. The bundled pnpm can trigger local build-approval prompts that do not reproduce in the user's shell. On this machine, the user's pnpm is currently `/opt/homebrew/bin/pnpm`.
<!-- END:tooling-agent-rules -->

<!-- BEGIN:api-client-agent-rules -->
# API Client

Do not use `fetchClient` directly. Use `$api.useQuery()` and `$api.useMutation()` instead.

When a `queryKey` is needed, use `$api.queryOptions().queryKey`.
<!-- END:api-client-agent-rules -->

<!-- BEGIN:backend-architecture-agent-rules -->
# Backend Architecture

Manage backend-related code under `core` using port and adapter architecture.

- Put feature backend code under `core/{feature}`.
- Keep `model`, `domain`, and `application` independent from Next.js, Drizzle, database schema types, request/response APIs, and external SDK implementations.
- Expose inbound behavior through `application/port/in` use case interfaces.
- Hide outbound I/O behind `application/port/out` interfaces.
- Put concrete DB, external API, framework, and SDK implementations in `adapter`.
- Wire ports to implementations in `core/config/BeanConfig.ts`.
- `app`, route handlers, server actions, and `proxy.ts` should call application in-ports or query ports instead of importing DB tables directly.
- Auth/domain model types should be owned by `core/{feature}/model` or `core/{feature}/domain`; adapters map persistence rows into those models.
- Keep `lib/db/schema.ts` as the DB schema source of truth, but do not leak its inferred row types into core application/model contracts.
<!-- END:backend-architecture-agent-rules -->

<!-- BEGIN:db-schema-agent-rules -->
# DB Schema

Name database tables in the singular form.

In `lib/db/schema.ts`, declare table variables using the `{name}Table` pattern, for example `userTable`.
<!-- END:db-schema-agent-rules -->
