import { gql } from '@apollo/client'

export const GetDistricts = gql`
  query GetDistricts($stateCode: String) {
    getDistricts(state_code: $stateCode) {
      district_code
      district_name
      state_code
    }
  }
`

export default GetDistricts
