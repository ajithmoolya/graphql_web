import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROLES } from './utils/constants'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/common/LoadingSpinner'

// SuperAdmin pages
import SADashboard from './pages/superadmin/Dashboard'
import SACategories from './pages/superadmin/Categories'
import SAUsers from './pages/superadmin/Users'
import SAOfficers from './pages/superadmin/Officers'
import SAStaff from './pages/superadmin/Staff'
import SADistrictAdmins from './pages/superadmin/DistrictAdmins'
import SAGrievances from './pages/superadmin/Grievances'
import SAGrievanceDetail from './pages/superadmin/GrievanceDetail'
import SARatings from './pages/superadmin/Ratings'
import SALogs from './pages/superadmin/Logs'

// DistrictAdmin pages
import DADashboard from './pages/districtadmin/Dashboard'
import DAOfficers from './pages/districtadmin/Officers'
import DAStaff from './pages/districtadmin/Staff'
import DAGrievances from './pages/districtadmin/Grievances'
import DAGrievanceDetail from './pages/districtadmin/GrievanceDetail'
import DARatings from './pages/districtadmin/Ratings'

function ProtectedRoute({ children }) {
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* SuperAdmin routes */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <Layout role={ROLES.SUPER_ADMIN} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<SADashboard />} />
        <Route path="categories" element={<SACategories />} />
        <Route path="users" element={<SAUsers />} />
        <Route path="officers" element={<SAOfficers />} />
        <Route path="staff" element={<SAStaff />} />
        <Route path="admins" element={<SADistrictAdmins />} />
        <Route path="grievances" element={<SAGrievances />} />
        <Route path="grievances/:id" element={<SAGrievanceDetail />} />
        <Route path="ratings" element={<SARatings />} />
        <Route path="logs" element={<SALogs />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* DistrictAdmin routes */}
      <Route
        path="/districtadmin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.DISTRICT_ADMIN]}>
            <Layout role={ROLES.DISTRICT_ADMIN} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DADashboard />} />
        <Route path="officers" element={<DAOfficers />} />
        <Route path="staff" element={<DAStaff />} />
        <Route path="grievances" element={<DAGrievances />} />
        <Route path="grievances/:id" element={<DAGrievanceDetail />} />
        <Route path="ratings" element={<DARatings />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
