import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, Bell } from 'lucide-react'

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const user = null
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">Grievance Management Portal</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          {user && (
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 leading-tight">{user.name}</p>
              <p className="text-xs text-gray-500 leading-tight">{user.role}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
