import { gql } from '@apollo/client'

export const GET_GRIEVANCE_BY_ID = gql`
  query GetGrievanceByID($id: ID) {
    GetGrievanceByID(id: $id) {
      id
      grievance_id
      title
      description
      category
      status
      stateId
      districtId
      user_id
      assignedTo
      image_data
      createdAt
      updatedAt
    }
  }
`
