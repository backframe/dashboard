# The Backframe admin monorepo

This monorepo houses the source code for the backframe admin dashboard. It uses [pnpm](https://pnpm.io) as the package manager and turborepo. It includes the following apps and packages:

- [Admin UI](apps/ui/) - A React app containing the actual UI
- [Admin Stub](apps/stub) - A mock express server to stub out the backend in dev mode
- [Admin Utils](packages/admin-utils/) - Utilities for making requests to the server
- [Database](packages/database/) - A package using prisma and sqlite for testing
- [Shared](packages/shared/) - Shared utilities and interfaces across the monorepo
