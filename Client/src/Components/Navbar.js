import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Assets/logo.png";
import logo1 from "../Assets/Logo1.jpg"

const NavigationBar = () => {
  const [navbarColor, setNavbarColor] = useState('transparent');
  const [navbarPosition, setNavbarPosition] = useState('absolute');
  const [boxShadow, setBoxShadow] = useState('0 4px 6px rgba(0, 0, 0, 0)');
  const [linkColor, setLinkColor] = useState('white');
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarColor('white');
      setNavbarPosition('fixed');
      setLinkColor('black')
      setBoxShadow('0 4px 6px rgba(0, 0, 0, 0.5)')
    } else {
      setNavbarColor('transparent');
      setNavbarPosition('absolute');
      setLinkColor('white')
      setBoxShadow('0 4px 6px rgba(0, 0, 0, 0)')
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: navbarColor  ,
    position: navbarPosition,
    width: '100%',
    zIndex: '1000',
    transition: 'background-color 0.3s ease',
    boxShadow: boxShadow
  };
  

  const linkStyle = {
    width:100,
    color: linkColor,
    marginRight: '80px',
    fontFamily: 'Verdana, Geneva, sans-serif', 
    fontSize: 18,
  };

  const buttonStyle = {
    fontSize:'1rem',
    color: 'white',
    borderColor: '#3ca5dc',
    marginLeft: '30px',
    marginRight: '30px',
    backgroundColor: '#3ca5dc',
    width: 200,
  };

  const brandStyle = {
    marginLeft:60,
    color: '#3ca5dc',
    fontFamily: 'Verdana, Geneva, sans-serif', 
    fontSize: '2.2rem', 
    fontStyle: 'italic',
    fontWeight: 'bold',
  };

  const logoStyle = {
    width: '12%',
    height: '12%',  
    marginLeft: '-20px'
  };

  const dropdownItemStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'Verdana, Geneva, sans-serif'
  };

  const handleLoginClick = () => {
    navigate('/registerUser');
  };

  return (
    <Navbar style={navbarStyle} expand="lg" variant="dark">
      <div className="d-flex align-items-center">
      <Navbar.Brand as={Link} to="/" style={brandStyle}>
        <span style={{ color: '#ab0a0f' }}>Trust</span>
        <span style={{ color: '#4299cf' }}>Blu</span>
      </Navbar.Brand>
        <img src={logo1} style={logoStyle} className="d-none d-md-block" alt="Logo" />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{marginRight:20}}>
          <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/services" style={linkStyle}>Services</Nav.Link>
          <NavDropdown title={<span style={{ color: 'red', fontWeight: 'bold' }}>Contribute</span>} id="contribute-dropdown" style={{ width:100,marginRight: '80px', fontFamily: 'Verdana, Geneva, sans-serif', fontSize: 18}}>
            <div style={dropdownItemStyle}>
              <NavDropdown.Item as={Link} to="/donate">
                <strong>Financial donations</strong>
                <div className="ml-2">
                  <div>Donate now</div>
                  <div>Become a financial supporter</div>
                  <div>Your gifts at work</div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/volunteer">
                <strong>Volunteering</strong>
                <div className="ml-2">
                  <div>Become a volunteer</div>
                  <div>Youth volunteers</div>
                  <div>Youth advocacy</div>
                </div>
              </NavDropdown.Item>
            </div>
          </NavDropdown>
          <Nav.Link as={Link} to="/about" style={linkStyle}>About Us</Nav.Link>
        </Nav>
        <Nav>
          <Button onClick={handleLoginClick} to="/login" variant="outline-light" style={buttonStyle}>Login / Register</Button>
        </Nav>       
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
