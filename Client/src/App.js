import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import FindBlood from './Pages/FindBlood';
import RegisterUser from './Pages/RegisterUser';
import Services from './Pages/Services';
import Footer from './Components/Footer';
// import Minting from './Pages/Mintpage';
import UserDashboard from './Pages/UserDashboard';
import QRCodeData from './Components/QRCodeData';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isQRCodePage = location.pathname.startsWith('/qrcode/');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-blood" element={<FindBlood />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userDashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/qrcode/:id" element={<QRCodeData />} />
      </Routes>
      {!isQRCodePage && <Footer />}
    </>
  );
};

export default App;
