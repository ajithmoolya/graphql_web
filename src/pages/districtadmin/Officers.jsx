import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import { AvailabilityBadge } from '../../components/common/Badge'
import { Plus, UserCog } from 'lucide-react'

export default function DAOfficers() {
  const user = null
  const [createModal, setCreateModal] = useState(false)
  const [form, setForm] = useState({ name: '', mobile_number: '', email: '', state: user?.state || '', categories: [], password: '' })
  const [formError, setFormError] = useState('')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refetch = () => {}

  const [catData, setCatData] = useState(null)
  const categories = catData?.getCategories || []

  const [creating, setCreating] = useState(false)
  const createStaff = async ({ variables }) => {}

  const handleCreate = (e) => {
    e.preventDefault()
    setFormError('')
    const required = ['name', 'mobile_number', 'password']
    for (const f of required) {
      if (!form[f]?.trim()) { setFormError(`${f} is required`); return }
    }
    if (!form.categories.length) { setFormError('Select at least one category'); return }
    createStaff({
      variables: {
        ...form,
        role: 'GrievanceOfficer',
        district: user?.district,
        state: form.state || user?.state,
        email: form.email || undefined,
      },
    })
  }

  const toggleCategory = (catId) => {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(catId)
        ? f.categories.filter(c => c !== catId)
        : [...f.categories, catId],
    }))
  }

  const officers = data?.getUsersByRole || []
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
        <button className="btn-primary flex items-center gap-2" onClick={() => { setCreateModal(true); setFormError('') }}>
          <Plus className="h-4 w-4" />
          Add Officer
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && officers.length === 0 && (
        <div className="card text-center py-12">
          <UserCog className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No officers in this district.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {officers.map((officer) => (
          <div key={officer.id} className="card">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm flex-shrink-0">
                  {officer.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{officer.name}</p>
                  <p className="text-xs text-gray-500">{officer.mobile_number}</p>
                </div>
              </div>
              <AvailabilityBadge isAvailable={officer.isAvailable} />
            </div>
            {officer.categories?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {officer.categories.map(c => (
                  <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{c}</span>
                ))}
              </div>
            )}
          </div>
        ))}
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
              <label className="label">Password <span className="text-red-500">*</span></label>
              <input className="input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
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
    </div>
  )
}
