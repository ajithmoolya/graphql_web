import { useQuery } from '@apollo/client'
import { GET_DASHBOARD_STATS } from '../../services/graphql/query/GetDashboardStats'

export function useDashboard(variables = {}) {
  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_STATS, { variables })
  const stats = data?.getDashboardStats ?? null
  return { stats, loading, error, refetch }
}
