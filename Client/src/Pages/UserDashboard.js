import React, { useState } from 'react';
import '../Styles/Dashboard.css';
import logo from "../Assets/logo.png";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`dashboard ${open ? 'drawer-open' : 'drawer-closed'}`}>
      <header className={`app-bar ${open ? 'open' : 'closed'}`}>
        <button className="menu-icon" onClick={toggleDrawer}>
          ☰
        </button>
        <div className="d-flex align-items-center">
        <img src={logo} style={logoStyle} className="d-none d-md-block" alt="Logo" />
        <img src={logo} style={responsiveLogoStyle} className="d-block d-md-none" alt="Logo" />
        <h1 style={brandStyle}>TrustBlu</h1>
        </div>
        <button className="notifications-icon">
          <span className="badge">4</span>
        </button>
      </header>
      <aside className={`drawer ${open ? 'open' : 'closed'}`}>
        <nav className="drawer-nav">
          {/* Add navigation items here */}
        </nav>
      </aside>
      <main className="main-content">
      </main>
    </div>
  );
}

const brandStyle = {
  color: '#3ca5dc',
  fontFamily: 'Verdana, Geneva, sans-serif', 
  fontSize: '2rem', 
  fontStyle: 'italic',
  fontWeight: 'bold',
};

const logoStyle = {
  width: '14%',
  height: '14%',  
  marginLeft: '10px'
};

const responsiveLogoStyle = {
  width: '10%',
  height: '10%',
  marginLeft: '10px'
};