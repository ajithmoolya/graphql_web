
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",

  documents: [
    "./services/graphql/**/*.{js,jsx}",
    "!./services/graphql/**/__generated__/**",
  ],

  generates: {
    // Global types
    "./services/graphql/__generated__/globalTypes.ts": {
      plugins: ["typescript"],
    },

    // ALL operations in ONE folder
    "./services/graphql/__generated__/operations.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        dedupeFragments: true,
        operationResultSuffix: "Data",
        namingConvention: {
          typeNames: "pascal-case#pascalCase",
        },
      },
    },
  },
};

export default config;
