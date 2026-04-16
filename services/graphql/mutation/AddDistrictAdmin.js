import { gql } from '@apollo/client'

export const AddDistrictAdmin = gql`
  mutation AddDistrictAdmin(
    $name: String!
    $mobileNumber: String!
    $email: String!
    $password: String!
    $state: String!
    $district: String!
  ) {
    addDistrictAdmin(
      name: $name
      mobile_number: $mobileNumber
      email: $email
      password: $password
      state: $state
      district: $district
    ) {
      message
      success
    }
  }
`

export default AddDistrictAdmin
