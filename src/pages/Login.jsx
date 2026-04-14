import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ROLES } from '../utils/constants'
import { useAuth } from '../context/AuthContext'
import { LOGIN_MUTATION } from '../../services/graphql/mutation/Login'
import { ShieldCheck, Building2, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

const ROLE_CARDS = [
  {
    role: ROLES.SUPER_ADMIN,
    label: 'Super Admin',
    description: 'Full system access across all districts',
    icon: ShieldCheck,
    accent: 'from-violet-600 to-purple-700',
    border: 'border-violet-500',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-500',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    perks: ['All districts', 'Manage admins', 'System-wide reports'],
  },
  {
    role: ROLES.DISTRICT_ADMIN,
    label: 'District Admin',
    description: 'District-scoped management & escalations',
    icon: Building2,
    accent: 'from-blue-600 to-indigo-700',
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    ring: 'ring-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    perks: ['Officers & staff', 'Handle escalations', 'District reports'],
  },
]

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(ROLES.SUPER_ADMIN)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  // Prefill remembered email
  useEffect(() => {
    const saved = localStorage.getItem('gm_remembered_email')
    if (saved) { setEmail(saved); setRememberMe(true) }
  }, [])

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required')
      return
    }
    try {
      const { data } = await loginMutation({ variables: { email: email.trim(), password } })
      const result = data?.Login
      if (!result?.success) {
        setError(result?.message || 'Login failed')
        return
      }
      if (rememberMe) localStorage.setItem('gm_remembered_email', email.trim())
      else localStorage.removeItem('gm_remembered_email')
      login(result.token, {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
        mobile_number: result.mobile_number,
      })
      if (result.role === ROLES.SUPER_ADMIN) navigate('/superadmin/dashboard')
      else if (result.role === ROLES.DISTRICT_ADMIN) navigate('/districtadmin/dashboard')
      else setError('Unauthorized role')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  const activeCard = ROLE_CARDS.find(c => c.role === selectedRole)

  return (
    <div className="min-h-screen flex bg-gray-950">

      {/* Left decorative panel — hidden on small screens */}
      <div className={`hidden lg:flex lg:w-5/12 bg-gradient-to-br ${activeCard.accent} flex-col justify-between p-10 transition-all duration-500`}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide">GM Portal</span>
        </div>

        <div>
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
            Signing in as
          </p>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            {activeCard.label}
          </h2>
          <p className="text-white/70 text-base mb-8">{activeCard.description}</p>
          <ul className="space-y-3">
            {activeCard.perks.map(p => (
              <li key={p} className="flex items-center gap-2.5 text-white/80 text-sm">
                <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/30 text-xs">Grievance Management System · Admin Portal</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Back to home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to your admin account</p>
          </div>

          {/* Role selector cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {ROLE_CARDS.map(({ role, label, description, icon: Icon, border, bg, text, ring, iconBg, iconColor }) => {
              const isActive = selectedRole === role
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => { setSelectedRole(role); setError('') }}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none
                    ${isActive
                      ? `${border} ${bg} ring-2 ${ring} ring-offset-2 ring-offset-gray-950`
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-2.5 ${isActive ? iconBg : 'bg-gray-800'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? iconColor : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-sm font-semibold leading-tight ${isActive ? text : 'text-gray-300'}`}>{label}</p>
                  <p className={`text-xs mt-0.5 leading-tight ${isActive ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
                  {isActive && (
                    <span className={`absolute top-2.5 right-2.5 h-2 w-2 rounded-full ${role === ROLES.SUPER_ADMIN ? 'bg-violet-500' : 'bg-blue-500'}`} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-950 border border-red-800 rounded-xl text-sm text-red-300">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email or Mobile Number
              </label>
              <input
                type="text"
                autoFocus
                placeholder="Enter your email or mobile"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all
                  focus:ring-violet-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <button
                  type="button"
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  onClick={() => alert('Please contact your system administrator to reset your password.')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all
                    focus:ring-violet-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => setRememberMe(v => !v)}
                className={`h-4 w-4 rounded flex items-center justify-center border transition-colors flex-shrink-0
                  ${rememberMe
                    ? (selectedRole === ROLES.SUPER_ADMIN ? 'bg-violet-600 border-violet-600' : 'bg-blue-600 border-blue-600')
                    : 'bg-gray-900 border-gray-600'}`}
              >
                {rememberMe && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-gray-400">Remember me for 7 days</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-all mt-2 flex items-center justify-center gap-2
                ${selectedRole === ROLES.SUPER_ADMIN
                  ? 'bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg shadow-violet-900/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-900/40'
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in…
                </>
              ) : (
                <>Sign in as {activeCard.label}</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-8">
            This portal is restricted to authorised administrators only.
          </p>
        </div>
      </div>
    </div>
  )
}
