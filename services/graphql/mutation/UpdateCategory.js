import { gql } from '@apollo/client'

export const UpdateCategory = gql`
  mutation UpdateCategory($updateCategoryId: ID!, $name: String, $description: String) {
    UpdateCategory(id: $updateCategoryId, name: $name, description: $description) {
      id
      name
      description
      created_at
    }
  }
`

export default UpdateCategory
