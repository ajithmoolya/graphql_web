import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { Plus, Trash2, Shield } from 'lucide-react'

export default function SADistrictAdmins() {
  const [createModal, setCreateModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', mobile_number: '', email: '', district: '', state: '', password: '' })
  const [formError, setFormError] = useState('')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refetch = () => {}

  const [creating, setCreating] = useState(false)
  const addDistrictAdmin = async ({ variables }) => {}

  const [deleting, setDeleting] = useState(false)
  const softDeleteUser = async ({ variables }) => {}

  const handleCreate = (e) => {
    e.preventDefault()
    setFormError('')
    const required = ['name', 'mobile_number', 'district', 'state', 'password']
    for (const f of required) {
      if (!form[f].trim()) { setFormError(`${f} is required`); return }
    }
    addDistrictAdmin({ variables: { ...form, email: form.email || undefined } })
  }

  const admins = data?.getUsersByRole || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900">District Admins</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage district-level administrators</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => { setCreateModal(true); setFormError('') }}>
          <Plus className="h-4 w-4" />
          Add District Admin
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && admins.length === 0 && (
        <div className="card text-center py-12">
          <Shield className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No district admins yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((admin) => (
          <div key={admin.id} className="card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                  {admin.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{admin.name}</p>
                  <p className="text-xs text-gray-500 truncate">{admin.mobile_number}</p>
                </div>
              </div>
              <button
                onClick={() => setDeleteTarget(admin)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
              {admin.email && <p className="text-xs text-gray-500">✉ {admin.email}</p>}
              <p className="text-xs text-gray-500">📍 {admin.district}, {admin.state}</p>
              <p className="text-xs text-gray-400">Joined: {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Add District Admin">
        <form onSubmit={handleCreate} className="space-y-4">
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="label">Full Name <span className="text-red-500">*</span></label>
              <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Mobile <span className="text-red-500">*</span></label>
              <input className="input" type="tel" value={form.mobile_number} onChange={e => setForm(f => ({ ...f, mobile_number: e.target.value }))} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="label">District <span className="text-red-500">*</span></label>
              <input className="input" value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} />
            </div>
            <div>
              <label className="label">State <span className="text-red-500">*</span></label>
              <input className="input" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="label">Password <span className="text-red-500">*</span></label>
              <input className="input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" className="btn-secondary" onClick={() => setCreateModal(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={creating}>{creating ? 'Creating…' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => softDeleteUser({ variables: { userId: deleteTarget.id } })}
        title="Remove District Admin"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        loading={deleting}
      />
    </div>
  )
}
