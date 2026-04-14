import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import {
  FileText, Users, CheckCircle, AlertTriangle, XCircle, Clock,
  TrendingUp, UserCheck, HardHat, Star,
} from 'lucide-react'

const STATUS_COLORS_CHART = {
  Submitted: '#3b82f6',
  Assigned: '#6366f1',
  InProgress: '#f59e0b',
  Escalated: '#ef4444',
  Resolved: '#10b981',
  Rejected: '#6b7280',
  Closed: '#374151',
}

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

export default function SADashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const s = data?.getDashboardStats

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
        <p className="text-sm text-gray-500 mt-0.5">Overview of the entire grievance management system</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Grievances" value={s?.totalGrievances} icon={FileText} color="bg-primary-600" />
        <StatCard label="Total Citizens" value={s?.totalCitizens} icon={Users} color="bg-indigo-500" />
        <StatCard label="Officers" value={s?.totalOfficers} icon={UserCheck} color="bg-green-500" />
        <StatCard label="Field Staff" value={s?.totalStaff} icon={HardHat} color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Escalated" value={s?.escalated} icon={AlertTriangle} color="bg-red-500" />
        <StatCard label="In Progress" value={s?.inProgress} icon={Clock} color="bg-orange-500" />
        <StatCard label="Resolved" value={s?.resolved} icon={CheckCircle} color="bg-emerald-500" />
        <StatCard
          label="Avg Officer Rating"
          value={s?.averageOfficerRating ? `${s.averageOfficerRating.toFixed(1)} ★` : '—'}
          icon={Star}
          color="bg-amber-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusChartData.filter(d => d.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {statusChartData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS_CHART[entry.name] || '#3b82f6'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
