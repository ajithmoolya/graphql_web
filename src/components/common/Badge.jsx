import { STATUS_COLORS } from '../../utils/constants'

export function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] || 'badge-closed'
  return <span className={cls}>{status}</span>
}

export function RoleBadge({ role }) {
  const colorMap = {
    SuperAdmin: 'bg-purple-100 text-purple-800',
    DistrictAdmin: 'bg-blue-100 text-blue-800',
    GrievanceOfficer: 'bg-indigo-100 text-indigo-800',
    staff: 'bg-green-100 text-green-800',
    Citizen: 'bg-gray-100 text-gray-800',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[role] || 'bg-gray-100 text-gray-800'}`}>
      {role}
    </span>
  )
}

export function AvailabilityBadge({ isAvailable }) {
  return isAvailable ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
      Online
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500 inline-block" />
      Offline
    </span>
  )
}




