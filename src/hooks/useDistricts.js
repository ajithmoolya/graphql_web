import { useQuery } from '@apollo/client'
import GetDistricts from '../../services/graphql/query/GetDistricts'

export function useDistricts(stateCode) {
  const { data, loading, error, refetch } = useQuery(GetDistricts, {
    variables: { stateCode },
    skip: !stateCode,
  })

  return {
    districts: data?.getDistricts ?? [],
    loading,
    error,
    refetch,
  }
}

export default useDistricts
