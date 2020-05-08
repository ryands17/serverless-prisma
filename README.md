# Serverless Prisma 2

### A GraphQL API created using the [Serverless](https://serverless.com) framework using the following tools

- [Prisma 2](http://prisma.io/)
- [@nexus/schema](https://www.nexusjs.org/#/components/schema/about)
- [Apollo Server Lambda](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)

### Prerequisites

- node > 10
- yarn (recommended) or npm

### Commands

- `yarn dev`: Runs the server in development mode via the `sls offline` command and simulates the entire API on [http://localhost:3000/dev/graphql](http://localhost:3000/dev/graphql) by default.

- `yarn deploy`: Deploy your application via `sls deploy` on AWS Lambda.

**_Note_**: AWS Access and Secret keys must be configured via `aws configure` using the `aws-cli`. The setup uses the `default` profile but you can pass a custom one using `yarn deploy --profile profileName`.
