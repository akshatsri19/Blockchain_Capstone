import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import logo from "../Assets/logo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../Firebase/FirebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Button, ProgressBar, Dropdown, Nav, Form, Modal } from 'react-bootstrap';
import {  collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import QRCode from 'qrcode.react';  
import { FaHome, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import bloodDonationCenters from '../Datastore/datastore';
import { Card, Row, Col } from 'react-bootstrap';


const localIpAddress = '192.168.2.20';

const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (currentUser && activeSection === 'my-appointments') {
      fetchAppointments();
    }
  }, [currentUser, activeSection]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const fetchAppointments = async () => {
    const q = query(collection(db, 'appointments'), where('userId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const appointmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAppointments(appointmentsList);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'book-appointment':
        return <BookAppointmentSection />;
      case 'my-appointments':
        return <MyAppointmentsSection appointments={appointments} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`dashboard ${open ? 'drawer-open' : 'drawer-closed'}`}>
      <header className={`app-bar ${open ? 'open' : 'closed'}`} style={{ backgroundColor: "#192841" }}>
        <button className="menu-icon" onClick={toggleDrawer}>
          ☰
        </button>
        <Nav className="ml-auto" style={{marginLeft:-100}}>
          <Nav.Link as={Link} to="/home" style={navLinkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/about" style={navLinkStyle}>About</Nav.Link>
          <Nav.Link as={Link} to="/services" style={navLinkStyle}>Services</Nav.Link>
        </Nav>
        <div className="d-flex align-items-center" style={{marginLeft:-100}}>
          <img src={logo} style={logoStyle} className="d-none d-md-block" alt="Logo" />
          <img src={logo} style={responsiveLogoStyle} className="d-block d-md-none" alt="Logo" />
          <h1 style={brandStyle}>TrustBlu</h1>
        </div>
        
        {currentUser && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" style={dropdownToggleStyle}>
              {currentUser.email}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/my-profile">My Profile</Dropdown.Item>
              <Dropdown.Item href="#/change-email-password">Change Email or Password</Dropdown.Item>
              <Dropdown.Item href="#/eligibility-quiz">Eligibility Quiz</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </header>
      <aside className={`drawer ${open ? 'open' : 'closed'}`}>
        <div className="drawer-header">
          <h2>My Account</h2>
        </div>
        <nav className="drawer-nav">
        <Nav.Link onClick={() => setActiveSection('dashboard')} style={sidebarLinkStyle}>
            <FaHome style={iconStyle} /> My Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => setActiveSection('book-appointment')} style={sidebarLinkStyle}>
            <FaCalendarCheck style={iconStyle} /> Book Appointment
          </Nav.Link>
          <Nav.Link onClick={() => setActiveSection('my-appointments')} style={sidebarLinkStyle}>
            <FaClipboardList style={iconStyle} /> My Appointments
          </Nav.Link>
        </nav>
      </aside>
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

const Dashboard = () => {
  const totalTokens = 5000; 
  const earnedTokens = 1234;

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert('MetaMask wallet connected successfully!');
      } catch (error) {
        console.error('Error connecting MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to connect your wallet.');
    }
  };

  const styles = {
    profileContainer: {
        display: 'flex',
        // maxWidth: '1000px',
        // margin: 'auto',
        marginLeft:"-20%",
        backgroundColor: '#f0f4f8',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    leftColumn: {
        flex: 0.5,
        padding: '20px',
    },
    rightColumn: {
        flex: 2,
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    centerColumn: {
      flex: 2,
        padding: '20px',
    },
    imageContainer: {
        textAlign: 'center',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: '3px solid #333',
    },
    header: {
        textAlign: 'center',
    },
    blockquote: {
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        margin: '20px 0',
    },
    personalInfo: {
        backgroundColor: '#e0f7fa',
        padding: '10px',
        borderRadius: '5px',
    },
    traits: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },
    traitItem: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
    },
    section: {
        marginBottom: '20px',
    },
    sectionHeader: {
        marginBottom: '10px',
        color: '#333',
    },
    slider: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rangeInput: {
        width: '100%',
        margin: '0 10px',
    },
    listItem: {
        backgroundColor: '#e0f7fa',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '5px',
    },
};

  return (
    <div>

    
   
    <section>
      <div style={styles.profileContainer}>
            <div style={styles.leftColumn}>
                <div style={styles.imageContainer}>
                    <img src="https://via.placeholder.com/150" alt="Michael" style={styles.image} />
                </div>
                <h2 style={styles.header}>Michael</h2>
                <h3 style={styles.header}>Angel Investor</h3>
                <blockquote style={styles.blockquote}>
                    I am looking for visionary ventures with innovation, scalability, and market disruption. I am passionate about empowering transformative ideas, shaping the future of technology.
                </blockquote>
                <div style={styles.personalInfo}>
                    <p><strong>Age:</strong> 43</p>
                    <p><strong>Status:</strong> Married</p>
                    <p><strong>Location:</strong> Toronto</p>
                    <p><strong>Occupation:</strong> Investor</p>
                </div>
                <div style={styles.traits}>
                    <span style={styles.traitItem}>Organised</span>
                    <span style={styles.traitItem}>Practical</span>
                    <span style={styles.traitItem}>Punctual</span>
                    <span style={styles.traitItem}>Hardworking</span>
                </div>
                 <section className="tokens-earned" style={tokensEarnedStyle}>
      <h2 style={tokensEarnedTitleStyle}>Tokens Earned</h2>
      <div style={tokenInfoStyle}>
        <p style={tokensEarnedTextStyle}>You have earned {earnedTokens} tokens out of {totalTokens}.</p>
        <ProgressBar now={(earnedTokens / totalTokens) * 100} label={`${(earnedTokens / totalTokens) * 100}%`} style={progressBarStyle} />
      </div>
      <div style={buttonContainerStyle}>
        <Button variant="outline-primary" style={actionButtonStyle}>Claim Rewards</Button>
        <Button variant="outline-secondary" style={actionButtonStyle}>View Transactions</Button>
        <Button variant="outline-success" style={actionButtonStyle} onClick={connectWallet}>Connect MetaMask</Button>
      </div>
    </section>
            </div>
            <div style={styles.centerColumn}>
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>About</h3>
                    <p>
                        Michael is a seasoned angel investor with a wealth of experience in finance and entrepreneurship. With a diverse portfolio spanning technology startups, biotech firms, and social enterprises, he is renowned for his keen eye for promising ventures and his passion for supporting innovation. Michael actively seeks investment opportunities in high-growth sectors such as blockchain, artificial intelligence, and clean energy, with a focus on projects with strong potential for scalability and market impact. Michael is dedicated to empowering entrepreneurs and driving transformative ideas in technology and beyond with his expertise.
                    </p>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Goals</h3>
                    <ul>
                        <li style={styles.listItem}>Discover high-potential ventures</li>
                        <li style={styles.listItem}>Back scalable, impactful projects</li>
                        <li style={styles.listItem}>Foster transparent partnerships</li>
                        <li style={styles.listItem}>Generate sustainable returns with positive impact</li>
                        <li style={styles.listItem}>Support promising ventures for long-term success through mentorship and strategic guidance</li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Personality</h3>
                    <div style={styles.slider}>
                        <label>Introvert</label>
                        <input type="range" min="1" max="10" value="8" readOnly style={styles.rangeInput} />
                        <label>Extrovert</label>
                    </div>
                    <div style={styles.slider}>
                        <label>Analytical</label>
                        <input type="range" min="1" max="10" value="3" readOnly style={styles.rangeInput} />
                        <label>Creative</label>
                    </div>
                    <div style={styles.slider}>
                        <label>Loyal</label>
                        <input type="range" min="1" max="10" value="5" readOnly style={styles.rangeInput} />
                        <label>Self First</label>
                    </div>
                    <div style={styles.slider}>
                        <label>Active</label>
                        <input type="range" min="1" max="10" value="2" readOnly style={styles.rangeInput} />
                        <label>Passive</label>
                    </div>
                </div>
               
            </div>
            <div style={styles.rightColumn}>
            <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Frustration</h3>
                    <ul>
                        <li style={styles.listItem}>Limited access to high-quality investment opportunities in desired sectors</li>
                        <li style={styles.listItem}>Difficulty in finding transparent and trustworthy entrepreneurs and startups</li>
                        <li style={styles.listItem}>Challenges in identifying ventures with both high scalability and meaningful societal impact</li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Motivations</h3>
                    <ul>
                        <li style={styles.listItem}>Innovation</li>
                        <li style={styles.listItem}>Desire for Impact</li>
                        <li style={styles.listItem}>Growth</li>
                        <li style={styles.listItem}>Empowerment</li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Brands</h3>
                    <p>Y Combinator, Founders Fund, Techstars, Andreessen Horowitz, Bessemer Venture Partners500 Startups</p>
                </div>
            </div>
        </div>
    </section>
    </div>

    
  );
};

const BookAppointmentSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user && selectedCenter) {
      try {
        await addDoc(collection(db, 'appointments'), {
          location: selectedCenter.address,
          donationCenter: selectedCenter.name,
          date,
          time,
          userId: user.uid,
          lat: selectedCenter.lat,
          lng: selectedCenter.long,
        });
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Error adding appointment: ', error);
      }
    } else {
      console.error('No user is signed in or no center selected.');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  const handleBackClick = () => {
    setSelectedCenter(null);
  };

  return (
    <section style={sectionStyle}>
    <div style={formContainerStyle}>
      <Form onSubmit={handleSubmit} style={formStyle}>
        <Form.Group controlId="search">
          <Form.Label style={{ color: "#3ca5dc", fontWeight: "bold" }}>Search Donation Center</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter donation center name or location"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color: "#3ca5dc" }}
          />
        </Form.Group>

        {!selectedCenter && (
          <Row>
            {bloodDonationCenters
              .filter((center) =>
                center.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((center) => (
                <Col key={center.name} xs={12} md={4} style={{ marginBottom: '20px' }}>
                  <Card onClick={() => handleCenterSelect(center)}>
                    <Card.Body>
                      <Card.Title style={{ color: "#3ca5dc" }}>{center.name}</Card.Title>
                      <Card.Text style={{ color: "#3ca5dc" }}>{center.address}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        )}

        {selectedCenter && (
          <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title style={{ color: "#3ca5dc" }}>{selectedCenter.name}</Card.Title>
              <Card.Text style={{ color: "#3ca5dc" }}>{selectedCenter.address}</Card.Text>
              <Card.Text style={{ color: "#3ca5dc" }}>Phone: {selectedCenter.phone}</Card.Text>
              <Card.Text style={{ color: "#3ca5dc" }}>Hours:</Card.Text>
              <ul>
                {Object.keys(selectedCenter.hours).map((day) => (
                  <li key={day} style={{ color: "#3ca5dc" }}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}: {selectedCenter.hours[day]}
                  </li>
                ))}
              </ul>

              <Form.Group controlId="date" style={{ marginTop: 20 }}>
                <Form.Label style={{ color: "#3ca5dc", fontWeight: "bold" }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={{ color: "#3ca5dc" }}
                />
              </Form.Group>

              <Form.Group controlId="time" style={{ marginTop: 20 }}>
                <Form.Label style={{ color: "#3ca5dc", fontWeight: "bold" }}>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  style={{ color: "#3ca5dc" }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={submitButtonStyle}>
                Book Appointment
              </Button>
              <Button variant="secondary" onClick={handleBackClick}>
                    Back
                  </Button>
            </Card.Body>
          </Card>
        )}

      </Form>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Booked Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your appointment has been booked successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </section>
  );
};


const MyAppointmentsSection = ({ appointments }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAAFI4ON-NQGEu4KcpoIVrPaqkHjlqOE-8' 
  });
  
  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach(appointment => {
        console.log('Marker coordinates:', { lat: appointment.lat, lng: appointment.lng });
      });
    }
  }, [appointments]);

  return (
    <section style={sectionStyle1}>
      <h2 style={sectionTitleStyle}>My Appointments</h2>
      <ul style={listStyle1}>
        {appointments.map(appointment => (
          <li key={appointment.id} style={listItemStyle}>
            <p><strong>Location:</strong> {appointment.location}</p>
            <p><strong>Donation Center:</strong> {appointment.donationCenter}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <QRCode value={`http://${localIpAddress}:3000/qrcode/${appointment.id}`} size={128} />
            {isLoaded && (
              <div style={{ height: '400px', marginTop: '20px' }}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: appointment.lat, lng: appointment.lng }}
                  zoom={14}
                >
                  <Marker key={appointment.id} position={{ lat: appointment.lat, lng: appointment.lng }} />
                </GoogleMap>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};


export default UserDashboard;

const sectionStyle = {
  marginTop:40,
  marginLeft:-100,
  padding: '20px',
  backgroundColor:"white",
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
  height:'80%',
};

const sectionStyle1 = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  margin: '20px auto',
  width: '80%',
  height: '100%',
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

const sectionTitleStyle = {
  color: '#3ca5dc',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};


const formStyle = {
  textAlign: 'left',
  width:'100%',
  marginRight:20,
};

const submitButtonStyle = {
  marginTop: '20px',
  width: '3 0%',
  fontFamily: 'Verdana, Geneva, sans-serif',
  backgroundColor:"#3ca5dc",
  marginBottom:30
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  overflowY: 'auto',
  borderRadius: '4px',
  height:300
};

const listStyle1 = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '95%',
  overflowY: 'auto',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const listItemStyle = {
  backgroundColor: '#3ca5dc',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  color:'white'
};


const centerInfoStyle = {
  margin: '20px 0',
  textAlign: 'left',
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

const navLinkStyle = {
  color: '#3ca5dc',
  fontSize: '1.2rem',
  marginLeft: '20px',
  textDecoration: 'none'
};

const dropdownToggleStyle = {
  color: '#3ca5dc',
  border: 'none',
  fontSize: 25
};

const sidebarLinkStyle = {
  display: 'block',
  padding: '10px 20px',
  color: '#3ca5dc',
  textDecoration: 'none',
  fontSize: '1.2rem',
};

const iconStyle = {
  marginRight: '10px',
};

const tokensEarnedStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  margin: '20px auto',
  width: '80%',
};

const tokensEarnedTitleStyle = {
  color: '#192841',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const tokenInfoStyle = {
  marginBottom: '20px',
};

const tokensEarnedTextStyle = {
  color: '#3ca5dc',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '1.2rem',
};

const progressBarStyle = {
  height: '25px',
  backgroundColor: '#e9ecef',
  borderRadius: '20px',
  overflow: 'hidden',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const actionButtonStyle = {
  width: '150px',
  fontFamily: 'Verdana, Geneva, sans-serif',
};
