import { useMutation } from '@apollo/client'
import REGISTER_MUTATION from '../../services/graphql/mutation/Register'

/**
 * useRegister
 * Performs register mutation for district admins to create staff/officers.
 * Returns a `register` function and the mutation state.
 */
export function useRegister() {
  const [mutate, { loading, error, data }] = useMutation(REGISTER_MUTATION)

  const register = async ({ name, mobileNumber, role, state, district, email, password }) => {
    const variables = { name, mobileNumber, role, state, district, email, password }
    // Validate required server-side fields to avoid GraphQL missing-variable errors
    if (!variables.state) throw new Error('State is required')
    if (!variables.district) throw new Error('District is required')
    console.log('register variables:', variables)
    const resp = await mutate({ variables })
    const result = resp?.data?.register
    if (!result) throw new Error('No response from register mutation')
    if (!result.success) throw new Error(result.message || 'Register failed')
    return result
  }

  return { register, loading, error, data }
}

export default useRegister
