import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { StatusBadge } from '../../components/common/Badge'
import { STATUS_LIST } from '../../utils/constants'
import { Search, ChevronRight, Filter } from 'lucide-react'

export default function SAGrievances() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const limit = 20

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const grievances = (data?.getGrievances || []).filter(g =>
    !search ||
    g.title?.toLowerCase().includes(search.toLowerCase()) ||
    g.district?.toLowerCase().includes(search.toLowerCase()) ||
    g.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">All Grievances</h1>
        <p className="text-sm text-gray-500 mt-0.5">View and monitor grievances across all districts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input pl-9 w-60"
            placeholder="Search title, district, category…"
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
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {grievances.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">No grievances found</td></tr>
                )}
                {grievances.map((g) => (
                  <tr
                    key={g.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/superadmin/grievances/${g.id}`)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{g.title}</td>
                    <td className="px-4 py-3 text-gray-600">{g.category || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{g.district || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                    <td className="px-4 py-3 text-gray-600">{g.submittedBy?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{g.createdAt ? new Date(g.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3"><ChevronRight className="h-4 w-4 text-gray-400" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <button
              className="btn-secondary text-xs py-1.5 px-3"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span className="text-xs text-gray-500">Page {page}</span>
            <button
              className="btn-secondary text-xs py-1.5 px-3"
              disabled={grievances.length < limit}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
