import { gql } from '@apollo/client'

export const GET_CATEGORY = gql`
  query GetCategory {
    GetCategory {
      id
      name
      description
      created_at
    }
  }
`
