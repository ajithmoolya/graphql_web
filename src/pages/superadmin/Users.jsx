import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { RoleBadge } from '../../components/common/Badge'
import { Search, Ban, Trash2, UserCheck2 } from 'lucide-react'

export default function SAUsers() {
  const [search, setSearch] = useState('')
  const [actionTarget, setActionTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refetch = () => {}

  const [blocking, setBlocking] = useState(false)
  const blockCitizen = async ({ variables }) => {}

  const [deleting, setDeleting] = useState(false)
  const softDeleteUser = async ({ variables }) => {}

  const users = (data?.getUsersByRole || []).filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.mobile_number?.includes(search) || u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Citizens</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage registered citizens</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input pl-9 w-64"
            placeholder="Search by name, mobile…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400 text-sm">No citizens found</td></tr>
                )}
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="px-4 py-3 text-gray-600">{u.mobile_number}</td>
                    <td className="px-4 py-3 text-gray-600">{u.email || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{u.district || '—'}</td>
                    <td className="px-4 py-3">
                      {u.isBlocked ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Blocked</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setActionTarget(u)}
                          className={`p-1.5 rounded-lg transition-colors ${u.isBlocked
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-orange-500 hover:bg-orange-50'}`}
                          title={u.isBlocked ? 'Unblock' : 'Block'}
                        >
                          {u.isBlocked ? <UserCheck2 className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(u)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!actionTarget}
        onClose={() => setActionTarget(null)}
        onConfirm={() => blockCitizen({ variables: { userId: actionTarget.id, isBlocked: !actionTarget.isBlocked } })}
        title={actionTarget?.isBlocked ? 'Unblock Citizen' : 'Block Citizen'}
        message={`Are you sure you want to ${actionTarget?.isBlocked ? 'unblock' : 'block'} ${actionTarget?.name}?`}
        confirmLabel={actionTarget?.isBlocked ? 'Unblock' : 'Block'}
        loading={blocking}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => softDeleteUser({ variables: { userId: deleteTarget.id } })}
        title="Delete User"
        message={`Are you sure you want to permanently delete ${deleteTarget?.name}? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  )
}
