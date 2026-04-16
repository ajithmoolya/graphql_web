import { useGetGrievanceQuery } from '../../services/graphql/__generated__/operations'

export function useGrievances() {
  const { data, loading, error, refetch } = useGetGrievanceQuery()
  const grievances = data?.GetGrievance || []
  return { grievances, loading, error, refetch }
}
