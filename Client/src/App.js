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
import UserDbTest from './Pages/UserDbTest';

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
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        {/* <Route path="/minting" element={<Minting />} /> */}
        <Route path="/userDashboard" element={<UserDashboard />} />
        {/* <Route path="/userDBTest" element={<UserDbTest />} />  */}
        <Route path="/qrcode/:id" element={<QRCodeData />} />
      </Routes>
      {!isQRCodePage && <Footer />}
    </>
  );
};

export default App;
