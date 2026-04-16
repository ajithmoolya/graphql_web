import { gql } from '@apollo/client'

export const GET_STATES = gql`
  query GetStates {
    getStates {
      state_code
      state_name
    }
  }
`
