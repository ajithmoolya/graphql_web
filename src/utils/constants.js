export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  DISTRICT_ADMIN: 'DistrictAdmin',
  GRIEVANCE_OFFICER: 'GrievanceOfficer',
  STAFF: 'staff',
  CITIZEN: 'Citizen',
}

export const GRIEVANCE_STATUSES = {
  SUBMITTED: 'Submitted',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'InProgress',
  CORRECTION_REQUESTED: 'CorrectionRequested',
  ESCALATED: 'Escalated',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected',
  CLOSED: 'Closed',
}

export const STATUS_COLORS = {
  Submitted: 'badge-submitted',
  Assigned: 'badge-assigned',
  InProgress: 'badge-inprogress',
  CorrectionRequested: 'badge-correction',
  Escalated: 'badge-escalated',
  Resolved: 'badge-resolved',
  Rejected: 'badge-rejected',
  Closed: 'badge-closed',
}

export const STATUS_LIST = Object.values(GRIEVANCE_STATUSES)
