import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { StatusBadge } from '../../components/common/Badge'
import { STATUS_LIST } from '../../utils/constants'
import { Search, Filter, ChevronRight, AlertTriangle } from 'lucide-react'

export default function DAGrievances() {
  const user = null
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const limit = 20

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refetch = () => {}

  const resolveGrievance = async ({ variables }) => {}

  const grievances = (data?.getGrievances || []).filter(g =>
    !search ||
    g.title?.toLowerCase().includes(search.toLowerCase()) ||
    g.category?.toLowerCase().includes(search.toLowerCase())
  )

  const escalated = grievances.filter(g => g.status === 'Escalated')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Grievances</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {user?.district || 'Your district'} — manage and resolve grievances
        </p>
      </div>

      {/* Escalated alert */}
      {escalated.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium">
            {escalated.length} escalated grievance{escalated.length > 1 ? 's' : ''} require your attention
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input pl-9 w-60"
            placeholder="Search title, category…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <div className="relative flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="input w-48"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          >
            <option value="">All Statuses</option>
            {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {grievances.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">No grievances found</td></tr>
                )}
                {grievances.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td
                      className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate cursor-pointer"
                      onClick={() => navigate(`/districtadmin/grievances/${g.id}`)}
                    >
                      {g.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{g.category || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                    <td className="px-4 py-3 text-gray-600">{g.assignedTo?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{g.createdAt ? new Date(g.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3">
                      {(g.status === 'Escalated' || g.status === 'Assigned' || g.status === 'InProgress') && (
                        <button
                          onClick={() => resolveGrievance({ variables: { grievanceId: g.id } })}
                          className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" onClick={() => navigate(`/districtadmin/grievances/${g.id}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <button className="btn-secondary text-xs py-1.5 px-3" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
            <span className="text-xs text-gray-500">Page {page}</span>
            <button className="btn-secondary text-xs py-1.5 px-3" disabled={grievances.length < limit} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
