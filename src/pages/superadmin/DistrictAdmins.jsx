import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { Plus, Trash2, Shield } from 'lucide-react'
import StateDistrictSelect from '../../components/common/StateDistrictSelect'
import { useMutation } from '@apollo/client'
import AddDistrictAdmin from '../../../services/graphql/mutation/AddDistrictAdmin.js'
import UpdateUser from '../../../services/graphql/mutation/UpdateUser'
import DeleteUser from '../../../services/graphql/mutation/DeleteUser'
import { useUsers } from '../../hooks'
import { useGetalluserQuery } from '../../../services/graphql/__generated__/operations'
import { ROLES } from '../../utils/constants'

export default function SADistrictAdmins() {
  const [createModal, setCreateModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', mobile_number: '', email: '', district: '', state: '', password: '' })
  const [formError, setFormError] = useState('')

  const { data, loading, error, refetch } = useGetalluserQuery({ variables: { role: ROLES.DISTRICT_ADMIN } })
  const users = data?.getalluser || []
  
  const [creating, setCreating] = useState(false)
  const [runAddDistrictAdmin] = useMutation(AddDistrictAdmin)
  const addDistrictAdmin = async ({ variables }) => {
    setCreating(true)
    try {
      const vars = {
        name: variables.name,
        mobileNumber: variables.mobile_number || '',
        email: variables.email || '',
        password: variables.password,
        state: variables.state,
        district: variables.district,
      }
      const res = await runAddDistrictAdmin({ variables: vars })
      // optionally refetch list
      refetch()
      setCreateModal(false)
    } catch (err) {
      setError(err)
    } finally {
      setCreating(false)
    }
  }

  const [deleting, setDeleting] = useState(false)
  const [runUpdateUser] = useMutation(UpdateUser)
  const [runDeleteUser] = useMutation(DeleteUser)

  const handleToggleActive = async (target) => {
    try {
      await runUpdateUser({ variables: { updateUserId: target.id, active: !target.active } })
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await runDeleteUser({ variables: { deleteUserId: deleteTarget.id } })
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const handleCreate = (e) => {
    e.preventDefault()
    setFormError('')
    const required = ['name', 'district', 'state', 'password']
    for (const f of required) {
      if (!form[f].trim()) { setFormError(`${f} is required`); return }
    }
    addDistrictAdmin({ variables: { ...form, email: form.email || undefined } })
  }

  const admins = users.filter(u => u.role === ROLES.DISTRICT_ADMIN)

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

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">District Admins ({admins.length})</h2>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">{admin.name?.[0]?.toUpperCase()}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{admin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{admin.mobile_number || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{admin.email || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{admin.district || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{admin.state || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleActive(admin)}
                      title={admin.active ? 'Block user' : 'Unblock user'}
                      className={`p-1.5 rounded-lg transition-colors ${admin.active ? 'text-gray-400 hover:text-yellow-700 hover:bg-yellow-50' : 'text-red-600 bg-red-50'}`}
                    >
                      <Shield className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(admin)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <label className="label">Mobile</label>
              <input className="input" type="tel" value={form.mobile_number} onChange={e => setForm(f => ({ ...f, mobile_number: e.target.value }))} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
              <div className="col-span-2">
                <StateDistrictSelect
                  stateValue={form.state}
                  onStateChange={(code) => setForm(f => ({ ...f, state: code }))}
                  districtValue={form.district}
                  onDistrictChange={(code) => setForm(f => ({ ...f, district: code }))}
                />
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
        onConfirm={handleDelete}
        title="Remove District Admin"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        loading={deleting}
      />
    </div>
  )
}
