
import { useState } from 'react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { Star } from 'lucide-react'

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`h-4 w-4 ${i <= value ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{value}/5</span>
    </div>
  )
}

export default function DARatings() {
  const user = null
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const officerRatings = ratings.filter(r => r.ratingType === 'citizen_to_officer')
  const staffRatings = ratings.filter(r => r.ratingType === 'officer_to_staff')

  const avg = (arr) => arr.length ? (arr.reduce((s, r) => s + r.stars, 0) / arr.length).toFixed(1) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Ratings</h1>
        <p className="text-sm text-gray-500 mt-0.5">{user?.district || 'Your district'} — officer and staff performance</p>
      </div>

      {/* Averages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-amber-50 border-amber-200">
          <p className="text-sm font-medium text-gray-700 mb-1">Avg Officer Rating</p>
          {avg(officerRatings) ? (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{avg(officerRatings)}</p>
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </div>
          ) : <p className="text-gray-400 text-sm">No ratings yet</p>}
          <p className="text-xs text-gray-500 mt-1">{officerRatings.length} reviews from citizens</p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm font-medium text-gray-700 mb-1">Avg Staff Rating</p>
          {avg(staffRatings) ? (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{avg(staffRatings)}</p>
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </div>
          ) : <p className="text-gray-400 text-sm">No ratings yet</p>}
          <p className="text-xs text-gray-500 mt-1">{staffRatings.length} reviews from officers</p>
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
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Grievance ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
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
                        r.ratingType === 'citizen_to_officer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
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
