import { useQuery } from '@apollo/client'
import GetAllUsers from '../../services/graphql/query/GetAllUsers'

export function useUsers(role) {
  const variables = role ? { role } : undefined
  const { data, loading, error, refetch } = useQuery(GetAllUsers, { variables })
  const users = data?.getalluser || []
  return { users, loading, error, refetch }
}
