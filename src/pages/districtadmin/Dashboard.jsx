import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { FileText, CheckCircle, AlertTriangle, Clock, UserCheck, HardHat } from 'lucide-react'

const STATUS_COLORS_CHART = {
  Submitted: '#3b82f6',
  Assigned: '#6366f1',
  'In Progress': '#f59e0b',
  Escalated: '#ef4444',
  Resolved: '#10b981',
  Rejected: '#6b7280',
  Closed: '#374151',
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
      </div>
    </div>
  )
}

import { useAuth } from '../../context/AuthContext'
import { useDashboard } from '../../hooks'

export default function DADashboard() {
  const { user } = useAuth()
  const { stats: s, loading, error, refetch } = useDashboard({ district: user?.district })

  if (loading) return <LoadingSpinner />
  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
      Failed to load dashboard: {error.message}
    </div>
  )

  const statusChartData = s ? [
    { name: 'Submitted', value: s.submitted },
    { name: 'Assigned', value: s.assigned },
    { name: 'In Progress', value: s.inProgress },
    { name: 'Escalated', value: s.escalated },
    { name: 'Resolved', value: s.resolved },
    { name: 'Rejected', value: s.rejected },
    { name: 'Closed', value: s.closed },
  ] : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {user?.district ? `District: ${user.district}` : 'Your district overview'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Grievances" value={s?.totalGrievances} icon={FileText} color="bg-primary-600" />
        <StatCard label="Escalated" value={s?.escalated} icon={AlertTriangle} color="bg-red-500" />
        <StatCard label="In Progress" value={s?.inProgress} icon={Clock} color="bg-yellow-500" />
        <StatCard label="Resolved" value={s?.resolved} icon={CheckCircle} color="bg-emerald-500" />
        <StatCard label="Officers" value={s?.totalOfficers} icon={UserCheck} color="bg-indigo-500" />
        <StatCard label="Field Staff" value={s?.totalStaff} icon={HardHat} color="bg-green-500" />
      </div>

      <div className="card">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Grievances by Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {statusChartData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS_CHART[entry.name] || '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
