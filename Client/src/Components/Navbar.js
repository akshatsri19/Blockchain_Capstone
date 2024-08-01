import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Assets/logo.png";

const NavigationBar = () => {
  const [navbarColor, setNavbarColor] = useState('transparent');
  const [navbarPosition, setNavbarPosition] = useState('absolute');
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarColor('#192841');
      setNavbarPosition('fixed');
    } else {
      setNavbarColor('transparent');
      setNavbarPosition('absolute');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: navbarColor,
    position: navbarPosition,
    width: '100%',
    zIndex: '1000',
    transition: 'background-color 0.3s ease',
  };

  const linkStyle = {
    color: 'white',
    marginRight: '100px',
    fontFamily: 'Verdana, Geneva, sans-serif', 
    fontSize: 20,
  };

  // const dropdownStyle = {
  //   marginRight: '30px'
  // };

  const buttonStyle = {
    color: 'white',
    borderColor: '#3ca5dc',
    marginLeft: '30px',
    marginRight: '30px',
    backgroundColor: '#3ca5dc',
    width: 200,
  };

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

  const handleLoginClick = () => {
    navigate('/registerUser');
  };

  return (
    <Navbar style={navbarStyle} expand="lg" variant="dark">
      <div className="d-flex align-items-center">
        <img src={logo} style={logoStyle} className="d-none d-md-block" alt="Logo" />
        <img src={logo} style={responsiveLogoStyle} className="d-block d-md-none" alt="Logo" />
        <Navbar.Brand as={Link} to="/" style={brandStyle}>TrustBlu</Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: '5%' }}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/services" style={linkStyle}>Services</Nav.Link>
          <Nav.Link as={Link} to="/about" style={linkStyle}>About Us</Nav.Link>
          <Nav.Link as = {Link} to="/minting" style={linkStyle}>Minting</Nav.Link>
          {/* <NavDropdown title={<span style={{ color: 'white', fontSize: 20, fontFamily: 'Verdana, Geneva, sans-serif',}}>Register Now</span>} id="basic-nav-dropdown" style={dropdownStyle}>
            <NavDropdown.Item as={Link} to="/registerUser">User</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/option2">Admin</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
          <Button onClick={handleLoginClick} to="/login" variant="outline-light" style={buttonStyle}>Login OR Register</Button>
        </Nav>       
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
