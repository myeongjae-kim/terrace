<!-- BEGIN:tanstack-start-agent-rules -->
# This is NOT the tanstack-start you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Before making any TanStack Start-related change, use https://tanstack.com/start/latest/docs/framework/react/guide/routing as the entry point to the latest documentation, then read the current guide relevant to the specific area you are changing (for example routing, server functions, middleware, execution model, authentication, or deployment). Do not treat the routing guide as the only required reference. Heed deprecation notices.
<!-- END:tanstack-start-agent-rules -->

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

<!-- ASTRYX:START -->
Astryx v0.1.3 · 149 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing. Full page → AppShell; sidebar nav → SideNav.
- Frame first: pick the shell (AppShell / Layout+LayoutPanel) and budget regions in px BEFORE writing content (`astryx docs layout`).
- Dense data = rows (Table, List/Item) edge-to-edge — never Card-wrapped list items. Card = dashboard widgets, galleries, settings groups only.
- Status → StatusDot/Token; Badge only for counts and enumerated states, never decoration.
- Custom styling: component props first; else Tailwind utilities backed by tokens (bg-surface, text-primary, rounded-lg) via tailwind-theme.css. No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-* in :root.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   149 components by category
  template --list    page + block recipes
  docs <topic>       color, elevation, icons, illustrations, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->
