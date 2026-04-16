import { useLoginMutation } from '../../services/graphql/__generated__/operations'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../utils/constants'

/**
 * useLogin
 * Wraps the Login mutation with auth context and navigation.
 *
 * Usage:
 *   const { login, loading, error, setError } = useLogin()
 *   await login({ email, password, rememberMe })
 */
export function useLogin() {
  const { login: saveAuth } = useAuth()
  const navigate = useNavigate()
  const [loginMutation, { loading, error: apolloError }] = useLoginMutation()

  const login = async ({ email, password, rememberMe = false }) => {
    const { data } = await loginMutation({ variables: { email: email.trim(), password } })
    const result = data?.Login

    if (!result?.success) {
      throw new Error(result?.message || 'Login failed')
    }

    if (rememberMe) localStorage.setItem('gm_remembered_email', email.trim())
    else localStorage.removeItem('gm_remembered_email')

    saveAuth(result.token, {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      mobile_number: result.mobile_number,
    })

    if (result.role === ROLES.SUPER_ADMIN) navigate('/superadmin/dashboard')
    else if (result.role === ROLES.DISTRICT_ADMIN) navigate('/districtadmin/dashboard')
    else throw new Error('Unauthorized role')
  }

  return { login, loading, apolloError }
}
