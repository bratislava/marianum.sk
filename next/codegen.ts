import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: ['../strapi/schema.graphql', './graphql/schema-patch.graphql'],
  documents: './graphql/queries/**/*.{gql,graphql}',
  generates: {
    './graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
}

export default codegenConfig
