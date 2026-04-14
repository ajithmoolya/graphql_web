import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { ScrollText, RefreshCw } from 'lucide-react'

const ACTION_COLORS = {
  GRIEVANCE_CREATED: 'bg-blue-100 text-blue-800',
  STATUS_CHANGED: 'bg-indigo-100 text-indigo-800',
  USER_BLOCKED: 'bg-red-100 text-red-800',
  USER_DELETED: 'bg-red-100 text-red-800',
  CATEGORY_CREATED: 'bg-green-100 text-green-800',
  CATEGORY_DELETED: 'bg-orange-100 text-orange-800',
  GRIEVANCE_ESCALATED: 'bg-red-100 text-red-800',
  GRIEVANCE_RESOLVED: 'bg-green-100 text-green-800',
  GRIEVANCE_REJECTED: 'bg-gray-100 text-gray-800',
}

export default function SALogs() {
  const [entityType, setEntityType] = useState('')
  const [page, setPage] = useState(1)
  const limit = 30

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refetch = () => {}

  const logs = data?.getActivityLogs || []

  const parseMeta = (meta) => {
    try { return JSON.stringify(JSON.parse(meta), null, 2) } catch { return meta }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time audit trail of all system actions</p>
        </div>
        <button onClick={() => refetch()} className="btn-secondary flex items-center gap-2 text-sm">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          className="input w-48"
          value={entityType}
          onChange={e => { setEntityType(e.target.value); setPage(1) }}
        >
          <option value="">All Entity Types</option>
          <option value="grievance">Grievance</option>
          <option value="user">User</option>
          <option value="category">Category</option>
        </select>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && logs.length === 0 && (
        <div className="card text-center py-12">
          <ScrollText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No activity logs found</p>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="card py-3 px-4 flex flex-wrap items-start gap-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium flex-shrink-0 ${ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-700'}`}>
                {log.action}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  {log.entityType && <span className="font-medium">{log.entityType}</span>}
                  {log.entityId && <span className="text-gray-400 ml-1">#{log.entityId}</span>}
                  {log.actorId && <span className="text-gray-500 ml-2 text-xs">by user #{log.actorId}</span>}
                </p>
                {log.meta && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate" title={parseMeta(log.meta)}>
                    {log.meta}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {log.createdAt ? new Date(log.createdAt).toLocaleString() : '—'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button className="btn-secondary text-xs py-1.5 px-3" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Previous
        </button>
        <span className="text-xs text-gray-500">Page {page}</span>
        <button className="btn-secondary text-xs py-1.5 px-3" disabled={logs.length < limit} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
