import { gql } from '@apollo/client'

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats($district: String) {
    getDashboardStats(district: $district) {
      totalGrievances
      submitted
      assigned
      inProgress
      escalated
      resolved
      rejected
      closed
      totalCitizens
      totalOfficers
      totalStaff
      averageOfficerRating
    }
  }
`
