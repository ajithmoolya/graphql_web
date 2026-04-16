import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Tags, Users, Shield, FileText, Star, ScrollText,
  UserCog, HardHat, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { ROLES } from '../../utils/constants'

const superAdminNav = [
  { to: '/superadmin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/superadmin/categories', icon: Tags, label: 'Categories' },
  { to: '/superadmin/users', icon: Users, label: 'Citizens' },
  { to: '/superadmin/admins', icon: Shield, label: 'District Admins' },
  { to: '/superadmin/officers', icon: UserCog, label: 'Officers' },
  { to: '/superadmin/staff', icon: HardHat, label: 'Field Staff' },
  { to: '/superadmin/grievances', icon: FileText, label: 'Grievances' },
  { to: '/superadmin/ratings', icon: Star, label: 'Ratings' },
  { to: '/superadmin/logs', icon: ScrollText, label: 'Activity Logs' },
]

const districtAdminNav = [
  { to: '/districtadmin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/districtadmin/officers', icon: UserCog, label: 'Officers' },
  { to: '/districtadmin/staff', icon: HardHat, label: 'Field Staff' },
  { to: '/districtadmin/grievances', icon: FileText, label: 'Grievances' },
  { to: '/districtadmin/ratings', icon: Star, label: 'Ratings' },
]

export default function Sidebar({ role, open, setOpen }) {
  const nav = role === ROLES.SUPER_ADMIN ? superAdminNav : districtAdminNav
  const label = role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'District Admin'

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 flex flex-col
        ${open ? 'w-64' : 'w-16'}`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-gray-700 px-4 ${open ? 'justify-between' : 'justify-center'}`}>
        {open && (
          <div>
            <p className="text-xs font-bold text-primary-400 uppercase tracking-wider">GM Portal</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors mb-0.5
              ${isActive
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`
            }
            title={!open ? label : undefined}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {open && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
