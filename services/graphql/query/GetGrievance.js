import { gql } from '@apollo/client'

export const GET_GRIEVANCE = gql`
  query GetGrievance {
    GetGrievance {
      id
      grievance_id
      title
      description
      category
      stateId
      districtId
      status
      image_data
      user_id
      assignedTo
      createdAt
      updatedAt
    }
  }
`
