# GraphQL API (`/api/graphql`)

This directory exposes a [GraphQL](https://graphql.org/) endpoint powered by [Apollo Server](https://www.apollographql.com/docs/apollo-server/) inside the Next.js Pages Router.

- **Endpoint:** `POST /api/graphql`
- **Sandbox (dev):** open `/api/graphql` in the browser while `yarn dev` is running

The implementation lives in `src/graphql/` and is wired up through `src/pages/api/graphql.ts`.

## Quick try

```bash
yarn dev
```

Health check:

```graphql
query {
  health
}
```

List seeded items:

```graphql
query {
  items {
    id
    title
    description
  }
}
```

Create an item:

```graphql
mutation {
  createItem(input: { title: "New item", description: "From the sandbox" }) {
    id
    title
  }
}
```

## Apollo Server fundamentals

Apollo Server is a GraphQL server library. In this template it runs as a Next.js API route instead of a standalone Node process.

### Request flow

```text
Client (browser / app)
  -> POST /api/graphql
  -> Next.js API route (graphql.ts)
  -> Apollo Server
  -> resolvers
  -> data layer (in-memory store, DB, HTTP API, etc.)
  -> JSON response
```

1. The client sends a GraphQL document (query or mutation) as JSON.
2. Next.js forwards the request to the handler created by `@as-integrations/next`.
3. Apollo Server validates the document against the schema.
4. Resolvers run to fetch or change data.
5. Apollo Server returns `{ "data": ... }` or `{ "errors": ... }`.

### Core building blocks

| Piece                   | Role in this repo                                           | Where to look              |
| ----------------------- | ----------------------------------------------------------- | -------------------------- |
| **Schema (`typeDefs`)** | Declares types, queries, and mutations available to clients | `src/graphql/schema/`      |
| **Resolvers**           | Functions that return data for each schema field            | `src/graphql/resolvers/`   |
| **Context**             | Per-request shared data (auth user, DB client, `req`/`res`) | `src/graphql/context.ts`   |
| **Data layer**          | Persistence and business logic behind resolvers             | `src/graphql/data/`        |
| **API route**           | Boots Apollo Server and connects it to Next.js              | `src/pages/api/graphql.ts` |

### Schema (`typeDefs`)

The schema is the contract between client and server. It describes **what** can be queried, not **how**.

Example from the reference `Item` CRUD:

```graphql
type Query {
  items: [Item!]!
  item(id: ID!): Item
}

type Mutation {
  createItem(input: CreateItemInput!): Item!
}
```

- `Query` = read operations
- `Mutation` = write operations
- `!` = non-null
- `[Item!]!` = non-null list of non-null items

Schemas are split by domain under `src/graphql/schema/`. The root file composes them:

```ts
// src/graphql/schema/index.ts
export const typeDefs = [rootTypeDefs, itemTypeDefs];
```

When adding a new API surface, create `src/graphql/schema/<domain>.ts` and append it to the `typeDefs` array.

### Resolvers

Resolvers implement schema fields. A resolver receives:

1. `parent` — return value of the parent resolver (often unused on root fields)
2. `args` — field arguments from the client
3. `context` — per-request object from `createContext`
4. `info` — advanced metadata about the query (rarely needed in simple CRUD)

Example:

```ts
Query: {
  items: () => itemStore.findAll(),
  item: (_parent, { id }) => itemStore.findById(id) ?? null,
},
Mutation: {
  createItem: (_parent, { input }) => itemStore.create(input),
},
```

Resolver files mirror schema modules under `src/graphql/resolvers/`. Merge new resolver maps in `src/graphql/resolvers/index.ts`.

### Context

Context is created once per request. Use it for:

- authenticated user/session
- database connections or repositories
- request-scoped logging/tracing
- access to Next.js `req` / `res`

```ts
export function createContext(req, res) {
  return { req, res };
}
```

Resolvers should read dependencies from `context` instead of importing globals when those dependencies are request-specific (for example, the current user).

### Data layer

Resolvers should stay thin. Put storage and domain rules in `src/graphql/data/` (or swap in Prisma, Drizzle, REST clients, etc.).

The sample `itemStore` is an in-memory array — fine for sandboxing, not for production persistence.

### Errors

Throw `GraphQLError` for expected failures (validation, not found, forbidden):

```ts
import { GraphQLError } from 'graphql';

throw new GraphQLError('Item was not found.', {
  extensions: { code: 'NOT_FOUND' },
});
```

Clients receive structured errors in the `errors` array alongside partial `data` when applicable.

## Adding a new API (checklist)

1. **Model** — add TypeScript types in `src/graphql/types/<domain>.ts`.
2. **Data** — implement storage/access in `src/graphql/data/<domain>.ts`.
3. **Schema** — define GraphQL types, inputs, queries, and mutations in `src/graphql/schema/<domain>.ts`.
4. **Resolvers** — wire schema fields to the data layer in `src/graphql/resolvers/<domain>.ts`.
5. **Compose** — register the new `typeDefs` and resolvers in the `index.ts` files.
6. **Context (optional)** — inject shared services via `createContext` if resolvers need them.
7. **Verify** — exercise the operation in the Apollo Sandbox at `/api/graphql`.

### Example: adding a `User` query

`src/graphql/schema/user.ts`

```ts
import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  extend type Query {
    users: [User!]!
  }
`;
```

`src/graphql/resolvers/user.ts`

```ts
export const userResolvers = {
  Query: {
    users: () => userStore.findAll(),
  },
};
```

Then import both in the respective `index.ts` files.

## Project layout

```text
src/
  graphql/
    context.ts          # Per-request context factory
    data/               # Data access (swap for a real DB later)
    resolvers/          # Field resolvers grouped by domain
    schema/             # GraphQL type definitions grouped by domain
    types/              # Shared TypeScript types
  pages/
    api/
      graphql.ts        # Apollo Server + Next.js handler
      README.md         # This file
```

## Packages used

| Package                 | Purpose                               |
| ----------------------- | ------------------------------------- |
| `@apollo/server`        | GraphQL server                        |
| `@as-integrations/next` | Next.js API route adapter             |
| `graphql`               | GraphQL runtime                       |
| `graphql-tag`           | `gql` template tag for schema strings |

## Client usage

This template only includes the server. From a React page or external client, send HTTP POST requests:

```ts
const response = await fetch('/api/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query { items { id title } }`,
  }),
});

const { data, errors } = await response.json();
```

For a richer client experience, add [`@apollo/client`](https://www.apollographql.com/docs/react/) and point it at `/api/graphql`.

## Production notes

- Replace in-memory stores with a real database or upstream API.
- Add authentication/authorization in `createContext` and enforce it in resolvers.
- Consider query depth/complexity limits and rate limiting for public endpoints.
- Disable or protect the Apollo Sandbox in production if the endpoint is exposed.
