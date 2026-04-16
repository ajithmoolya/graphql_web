import { gql } from '@apollo/client'

export const DeleteUser = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    DeleteUser(id: $deleteUserId) {
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

export default DeleteUser
