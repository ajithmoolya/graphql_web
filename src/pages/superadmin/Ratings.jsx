import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { Star } from 'lucide-react'

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= value ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{value}/5</span>
    </div>
  )
}

export default function SARatings() {
  const [ratingType, setRatingType] = useState('')
  const [district, setDistrict] = useState('')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const ratings = data?.getRatings || []
  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Ratings</h1>
        <p className="text-sm text-gray-500 mt-0.5">View all ratings across the system</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          className="input w-56"
          value={ratingType}
          onChange={e => setRatingType(e.target.value)}
        >
          <option value="">All Rating Types</option>
          <option value="citizen_to_officer">Citizen → Officer</option>
          <option value="officer_to_staff">Officer → Staff</option>
        </select>
        <input
          className="input w-48"
          placeholder="Filter by district"
          value={district}
          onChange={e => setDistrict(e.target.value)}
        />
      </div>

      {/* Summary */}
      {avgRating && (
        <div className="card flex items-center gap-4 bg-amber-50 border-amber-200">
          <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
            <p className="text-sm text-gray-500">Average rating across {ratings.length} review{ratings.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">{error.message}</div>}

      {!loading && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Grievance ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rated User</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stars</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ratings.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No ratings found</td></tr>
                )}
                {ratings.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.grievanceId}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        r.ratingType === 'citizen_to_officer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {r.ratingType === 'citizen_to_officer' ? 'Citizen → Officer' : 'Officer → Staff'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.ratedUser}</td>
                    <td className="px-4 py-3"><StarRating value={r.stars} /></td>
                    <td className="px-4 py-3 text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
