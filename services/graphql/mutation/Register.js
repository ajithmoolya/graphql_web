import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $mobileNumber: String!, $role: String!, $state: String!, $district: String!, $email: String, $password: String) {
    register(name: $name, mobile_number: $mobileNumber, role: $role, state: $state, district: $district, email: $email, password: $password) {
      message
      success
    }
  }
`

export default REGISTER_MUTATION
