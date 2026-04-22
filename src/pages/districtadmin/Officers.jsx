import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { AvailabilityBadge } from '../../components/common/Badge'
import { Plus, Trash2, UserCog } from 'lucide-react'
import { useCategories } from '../../hooks'
import { useAuth } from '../../context/AuthContext'
import { useRegister } from '../../hooks/useRegister'
import StateDistrictSelect from '../../components/common/StateDistrictSelect'
import { ROLES } from '../../utils/constants'
import { useGetalluserQuery } from '../../../services/graphql/__generated__/operations'
import { useMutation } from '@apollo/client'
import DeleteUser from '../../../services/graphql/mutation/DeleteUser'

export default function DAOfficers() {
  const { user, isDistrictAdmin, isSuperAdmin } = useAuth()
  const [createModal, setCreateModal] = useState(false)
  const [form, setForm] = useState({ name: '', mobile_number: '', email: '', state: user?.state || '', district: user?.district || '', categories: [] })
  const [formError, setFormError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { data, loading, error, refetch } = useGetalluserQuery({ variables: { role: ROLES.GRIEVANCE_OFFICER } })
  const [mutationError, setMutationError] = useState(null)

  const { categories } = useCategories()

  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { register } = useRegister()
  const [runDeleteUser] = useMutation(DeleteUser)
  const createStaff = async ({ variables }) => {
    setCreating(true)
    
    try {
      const vars = {
        name: variables.name,
        mobileNumber: variables.mobile_number,
        email: variables.email,
        role: 'grievance_officer',
        state: variables.state,
        district: variables.district,
      }
      await register(vars)
      await refetch()
      setCreateModal(false)
    } catch (err) {
      setMutationError(err)
    } finally {
      setCreating(false)
    }
  }

  const handleCreate = (e) => {
    e.preventDefault()
    setFormError('')
    const required = ['name', 'mobile_number']
    for (const f of required) {
      if (!form[f]?.trim()) { setFormError(`${f} is required`); return }
    }
    if (!form.categories.length) { setFormError('Select at least one category'); return }

    // ensure state/district available (fall back to user values)
    const state = form.state || user?.state
    const district = form.district || user?.district
    if (!state) { setFormError('State is required'); return }
    if (!district) { setFormError('District is required'); return }

    createStaff({
      variables: {
        ...form,
        district,
        state,
        email: form.email || undefined,
      },
    })
  }

  const handleDeleteOfficer = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setMutationError(null)
    try {
      await runDeleteUser({ variables: { deleteUserId: deleteTarget.id } })
      await refetch()
      setDeleteTarget(null)
    } catch (err) {
      setMutationError(err)
    } finally {
      setDeleting(false)
    }
  }

  const toggleCategory = (catId) => {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(catId)
        ? f.categories.filter(c => c !== catId)
        : [...f.categories, catId],
    }))
  }

  const officers = data?.getalluser || []
  const online = officers.filter(o => o.isAvailable).length
  const offline = officers.filter(o => !o.isAvailable).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Grievance Officers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {user?.district || 'Your district'} — {online} online, {offline} offline
          </p>
        </div>
        {(isDistrictAdmin() || isSuperAdmin()) && (
          <button className="btn-primary flex items-center gap-2" onClick={() => { setCreateModal(true); setFormError('') }}>
            <Plus className="h-4 w-4" />
            Add Officer
          </button>
        )}
      </div>

      {loading && <LoadingSpinner />}
      {(error || mutationError) && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{(mutationError || error)?.message}</div>}

      {!loading && officers.length === 0 && (
        <div className="card text-center py-12">
          <UserCog className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No officers in this district.</p>
        </div>
      )}

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Grievance Officers ({officers.length})</h2>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {officers.map((officer) => (
                  <tr key={officer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm flex-shrink-0">{officer.name?.[0]?.toUpperCase()}</div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{officer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{officer.mobile_number || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{officer.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{officer.district || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{(officer.categories || []).join(', ') || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <AvailabilityBadge isAvailable={officer.isAvailable} />
                        {(isDistrictAdmin() || isSuperAdmin()) && (
                          <button
                            onClick={() => setDeleteTarget(officer)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete officer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Add Grievance Officer">
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
            <div className="col-span-2">
              <StateDistrictSelect
                stateValue={form.state}
                onStateChange={(code) => setForm(f => ({ ...f, state: code }))}
                districtValue={form.district}
                onDistrictChange={(code) => setForm(f => ({ ...f, district: code }))}
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Grievance officers sign in using OTP. No password required.</p>
            </div>
            <div className="col-span-2">
              <label className="label">Categories <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2 mt-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      form.categories.includes(cat.id)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                {categories.length === 0 && <p className="text-xs text-gray-400">No categories available</p>}
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" className="btn-secondary" onClick={() => setCreateModal(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={creating}>{creating ? 'Creating…' : 'Add Officer'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteOfficer}
        title="Delete Officer"
        message={`Are you sure you want to delete ${deleteTarget?.name || 'this officer'}? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </div>
  )
}











