import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { Plus, Pencil, Trash2, Tags } from 'lucide-react'
import { useCategories } from '../../hooks'

export default function SACategories() {
  const { categories, loading, error, refetch, createCategory, creating, updateCategory, updating, deleteCategory, deleting } = useCategories()
  const [createModal, setCreateModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })
  const [formError, setFormError] = useState('')

  const openEdit = (cat) => {
    setEditTarget(cat)
    setForm({ name: cat.name, description: cat.description || '' })
    setFormError('')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.name.trim()) { setFormError('Name is required'); return }
    try {
      await createCategory({ variables: { name: form.name.trim(), description: form.description.trim() || undefined } })
      setCreateModal(false)
      setForm({ name: '', description: '' })
      refetch && refetch()
    } catch (err) {
      setFormError(err.message || 'Failed to create category')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setFormError('Name is required'); return }
    try {
      await updateCategory({ variables: { updateCategoryId: editTarget.id, name: form.name.trim(), description: form.description.trim() || undefined } })
      setEditTarget(null)
      refetch && refetch()
    } catch (err) {
      setFormError(err.message || 'Failed to update category')
    }
  }

  // categories comes directly from useCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage grievance categories</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => { setCreateModal(true); setForm({ name: '', description: '' }); setFormError('') }}>
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && categories.length === 0 && (
        <div className="card text-center py-12">
          <Tags className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No categories yet. Add one to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="card flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{cat.name}</h3>
                {cat.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{cat.description}</p>}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteTarget(cat)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">Created: {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : '—'}</p>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Add Category">
        <form onSubmit={handleCreate} className="space-y-4">
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div>
            <label className="label">Name <span className="text-red-500">*</span></label>
            <input className="input" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Roads & Infrastructure" />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input resize-none" rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" className="btn-secondary" onClick={() => setCreateModal(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={creating}>{creating ? 'Creating…' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Category">
        <form onSubmit={handleUpdate} className="space-y-4">
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div>
            <label className="label">Name <span className="text-red-500">*</span></label>
            <input className="input" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input resize-none" rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" className="btn-secondary" onClick={() => setEditTarget(null)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={updating}>{updating ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          try {
            await deleteCategory({ variables: { deleteCategoryId: deleteTarget.id } })
            refetch && refetch()
            setDeleteTarget(null)
          } catch (err) {
            // keep the dialog open and show error via formError
            setFormError(err.message || 'Failed to delete category')
          }
        }}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  )
}
