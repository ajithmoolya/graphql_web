import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { StatusBadge } from '../../components/common/Badge'
import { ArrowLeft, User, MapPin, Calendar, Tag } from 'lucide-react'

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs font-medium text-gray-500 w-36 flex-shrink-0 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-gray-900">{value || '—'}</span>
    </div>
  )
}

export default function SAGrievanceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const g = data?.getGrievanceById

  return (
    <div className="space-y-6 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Grievances
      </button>

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {g && (
        <div className="space-y-4">
          {/* Header */}
          <div className="card">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{g.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <StatusBadge status={g.status} />
                  {g.category && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Tag className="h-3 w-3" /> {g.category}
                    </span>
                  )}
                  {g.district && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" /> {g.district}, {g.state}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                  <Calendar className="h-3 w-3" />
                  {g.createdAt ? new Date(g.createdAt).toLocaleString() : '—'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">ID: {g.id}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{g.description}</p>
              </div>

              {g.rejectionReason && (
                <div className="card border-red-200 bg-red-50">
                  <h2 className="text-sm font-semibold text-red-700 mb-1">Rejection Reason</h2>
                  <p className="text-sm text-red-600">{g.rejectionReason}</p>
                </div>
              )}

              {g.correctionMessage && (
                <div className="card border-orange-200 bg-orange-50">
                  <h2 className="text-sm font-semibold text-orange-700 mb-1">Correction Request Message</h2>
                  <p className="text-sm text-orange-600">{g.correctionMessage}</p>
                </div>
              )}

              {g.imageData && (
                <div className="card">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Evidence</h2>
                  <img
                    src={g.imageData}
                    alt="Grievance evidence"
                    className="max-w-full rounded-lg border border-gray-200"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Submitted By */}
              {g.submittedBy && (
                <div className="card">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" /> Submitted By
                  </h2>
                  <InfoRow label="Name" value={g.submittedBy.name} />
                  <InfoRow label="Mobile" value={g.submittedBy.mobile_number} />
                  <InfoRow label="Email" value={g.submittedBy.email} />
                </div>
              )}

              {/* Assigned Officer */}
              {g.assignedTo && (
                <div className="card">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Assigned Officer</h2>
                  <InfoRow label="Name" value={g.assignedTo.name} />
                  <InfoRow label="Mobile" value={g.assignedTo.mobile_number} />
                </div>
              )}

              {/* Assigned Staff */}
              {g.assignedStaff && (
                <div className="card">
                  <h2 className="text-sm font-semibold text-gray-900 mb-3">Field Staff</h2>
                  <InfoRow label="Name" value={g.assignedStaff.name} />
                  <InfoRow label="Mobile" value={g.assignedStaff.mobile_number} />
                </div>
              )}

              {/* Timeline */}
              <div className="card">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Timeline</h2>
                <InfoRow label="Submitted" value={g.createdAt ? new Date(g.createdAt).toLocaleString() : null} />
                <InfoRow label="Escalated" value={g.escalatedAt ? new Date(g.escalatedAt).toLocaleString() : null} />
                <InfoRow label="Resolved" value={g.resolvedAt ? new Date(g.resolvedAt).toLocaleString() : null} />
                <InfoRow label="Closed" value={g.closedAt ? new Date(g.closedAt).toLocaleString() : null} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
