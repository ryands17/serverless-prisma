# Serverless Prisma

### A GraphQL API created using the [Serverless](https://serverless.com) framework using the following tools

- [Prisma 2](http://prisma.io/)
- [@nexus/schema](https://www.nexusjs.org/#/components/schema/about)
- [Apollo Server Lambda](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)

### Prerequisites

- node >= 12
- yarn (recommended) or npm

### Commands

- `yarn db:save`: Run this command at the start of the project to generate the migrations for your Prisma model located in `prisma/schema.prisma`

- `yarn db:migrate`: Run this command to add your migrations to the database.

- `yarn dev`: Runs the server in development mode via the `sls offline` command and simulates the entire API on [http://localhost:3000/dev/graphql](http://localhost:3000/dev/graphql) by default.

  - Copy/Rename the `.env.example` to `.env` and replace the `DATABASE_URL` with the database URL.

- `yarn deploy`: Deploy your application via `sls deploy` on AWS Lambda.
  - Copy/Rename the `.env.example` to `.env.production` and replace the `DATABASE_URL` with the database URL and set `NODE_ENV` to **production** (this is required for Nexus to not generate artifacts).

**_Note_**: AWS Access and Secret keys must be configured via `aws configure` using the [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html). The setup uses the `prisma_demo` profile but you can pass a custom one using `yarn deploy --profile profileName`.
