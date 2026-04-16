
import { gql } from '@apollo/client'

export const GetAllUsers = gql`
  query Getalluser($role: String) {
    getalluser(role: $role) {
      id
      email
      name
      mobile_number
      role
      state
      district
      active
    }
  }
`

export default GetAllUsers

