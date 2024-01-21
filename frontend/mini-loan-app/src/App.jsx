import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MainHome from "./MainHome";

import {
  AdminDashboardPreviewLoansPage,
  AdminDashboardPreviewUserTermsPage,
  AdminDashboardUsers,
  AdminLogin,
} from "./routes/AdminRoutes.js";

import {
  UserDashboard,
  LoginPage,
  RegisterPage,
  MyLoansDashboard,
  MyTermPage,
  RequestLoanPage
} from './routes/UserRoutes.js'

const ProtectedAdminRoute = ({ element }) => {
  const isAdmin = () => {
    const role = localStorage.getItem('adminRole')
    if (role === "admin") {
      return true;
    }
  };
  return isAdmin() ? element : (<AdminLogin />);
};

const ProtectedUserRoute = ({ element }) => {
  const isUser = () => {
    const role = localStorage.getItem('userRole')
    if (role === "user") {
      return true;
    }
  };
  return isUser() ? element : (<LoginPage />);
};

function App() {
  return (
    <>
      <Routes>


        {/* ******** Admin Routes start here ********* */}

        <Route
          path="/admin/login"

          element={<AdminLogin />}

        />
        <Route
          path="/admin/preview-terms/:userId/:termId"
          element={
            <ProtectedAdminRoute element={<AdminDashboardPreviewUserTermsPage />} />
          }
        />

        <Route
          path="/admin/preview-loan/:userId"
          element={
            <ProtectedAdminRoute element={<AdminDashboardPreviewLoansPage />} />
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute element={<AdminDashboardUsers />} />
          }
        />

        {/* ******** Admin Routes End here ********* */}



        <Route path="/" element={<MainHome />} />




        {/* ********* User Dashboard panel routes start from here ********* */}

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<ProtectedUserRoute element={<UserDashboard />} />} />
        <Route path='/loans' element={<ProtectedUserRoute element={<MyLoansDashboard />} />} />
        <Route path='/preview-terms/:termId' element={<ProtectedUserRoute element={<MyTermPage />} />} />
        <Route path='/request-loan' element={<ProtectedUserRoute element={<RequestLoanPage />} />} />

      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
