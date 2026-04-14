import { useNavigate } from 'react-router-dom'
import { ROLES } from '../utils/constants'
import { useEffect } from 'react'
import {
  ShieldCheck,
  FileText,
  Users,
  BarChart3,
  Bell,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Grievance Tracking',
    desc: 'Monitor every grievance from submission to resolution with full case history.',
  },
  {
    icon: Users,
    title: 'Team Management',
    desc: 'Manage Grievance Officers and Field Staff across districts with availability tracking.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    desc: 'District-level performance dashboards, ratings and real-time statistics.',
  },
  {
    icon: Bell,
    title: 'Escalation Alerts',
    desc: 'Automatic escalation with instant alerts when grievances breach deadlines.',
  },
]

const stats = [
  { label: 'Roles Supported', value: '5' },
  { label: 'Grievance Statuses', value: '8' },
  { label: 'Real-time Alerts', value: '✓' },
  { label: 'Smart Assignment', value: 'AI' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary-600 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">GM Portal</p>
            <p className="text-xs text-gray-500 leading-tight">Grievance Management</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 transition-colors text-white text-sm font-medium px-5 py-2 rounded-lg"
        >
          Login
          <ArrowRight className="h-4 w-4" />
        </button>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900 border border-primary-700 text-primary-300 text-xs font-medium mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse inline-block" />
          Admin & District Management Portal
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          Resolve Grievances{' '}
          <span className="text-primary-400">Faster & Smarter</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
          A unified portal for Super Admins and District Admins to manage grievances,
          track field staff, monitor performance and ensure every citizen complaint
          gets the attention it deserves.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 transition-all text-white font-semibold px-8 py-3.5 rounded-xl text-base shadow-lg shadow-primary-900"
          >
            Get Started — Login
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-800 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            Everything you need to manage grievances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-primary-700 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-900 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-gray-800 px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-8">Access by Role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold text-white">Super Admin</span>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Full system access across all districts',
                  'Manage District Admins & categories',
                  'View all grievances & ratings',
                  'Monitor activity logs',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold text-white">District Admin</span>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Manage officers & field staff',
                  'Handle escalated grievances',
                  'Reassign cases to officers',
                  'View district ratings & stats',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="mt-10 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 transition-all text-white font-semibold px-8 py-3.5 rounded-xl text-sm mx-auto"
          >
            Login to your account
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center text-xs text-gray-600">
        Grievance Management System · Admin Portal
      </footer>
    </div>
  )
}
