import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import FindBlood from './Pages/FindBlood';
import Register from './Pages/Register';
import RegisterUser from './Pages/RegisterUser';
import Services from './Pages/Services';
import Footer from './Components/Footer';
import UserDashboard from './Pages/UserDashboard';
import Admin from './Pages/Admin';
import UserDbTest from './Pages/UserDbTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-blood" element={<FindBlood />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/minting" element={<Admin />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        {/* Remove this path after we integarte nft functionality in user Dashboard */}
        <Route path="/userDBTest" element={<UserDbTest />} /> 
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
