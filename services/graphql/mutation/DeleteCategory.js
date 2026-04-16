import { gql } from '@apollo/client'

export const DeleteCategory = gql`
  mutation DeleteCategory($deleteCategoryId: ID!) {
    DeleteCategory(id: $deleteCategoryId) {
      created_at
      description
      id
      name
    }
  }
`

export default DeleteCategory
