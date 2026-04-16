import { gql } from '@apollo/client'

export const UpdateUser = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $name: String
    $email: String
    $mobileNumber: String
    $role: String
    $state: String
    $district: String
    $active: Boolean
  ) {
    UpdateUser(
      id: $updateUserId
      name: $name
      email: $email
      mobile_number: $mobileNumber
      role: $role
      state: $state
      district: $district
      active: $active
    ) {
      id
      email
      name
      mobile_number
      role
      state
      district
    }
  }
`

export default UpdateUser
