import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../Firebase/FirebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Button, ProgressBar, Dropdown, Nav, Form, Modal } from 'react-bootstrap';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import QRCode from 'qrcode.react';
import { FaHome, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import bloodDonationCenters from '../Datastore/datastore';
import { Card, Row, Col } from 'react-bootstrap';
import logo1 from "../Assets/Logo1.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';


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
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/home" style={navLinkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/about" style={navLinkStyle}>About</Nav.Link>
          <Nav.Link as={Link} to="/services" style={navLinkStyle}>Services</Nav.Link>
        </Nav>
        <div className="d-flex align-items-center" style={{ width: "30%" }}>
          <h1 style={brandStyle}>
            <span style={{ color: '#ab0a0f' }}>Trust</span>
            <span style={{ color: '#4299cf' }}>Blu</span>
          </h1>
          <img src={logo1} style={logoStyle} className="d-none d-md-block" alt="Logo" />
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

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    imageSrc: 'https://via.placeholder.com/150',
    name: 'Michael',
    quote: 'I am driven by a deep commitment to making a difference in the lives of others through blood donation',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        imageSrc: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };


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
      marginLeft: "-20%",
      padding: '20px'
    },
    leftColumn: {
      padding: '20px',
      backgroundColor: '#192841',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'justify',
      margin: '20px auto',
      color: '#3ca5dc'
    },
    topRightColumn: {
      display: 'flex',
      padding: '20px',
      backgroundColor: '#e0f7fa',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      flexDirection: 'row',
      height: '50%',
      width: '102%'
    },
    bottomRightColumn: {
      padding: '20px',
      backgroundColor: "#192841",
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      height: '50%',
      marginTop: 20,
      width: '102%',
      color: "#e0f7fa"
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
      marginTop: 20,
      color: "#e0f7fa"
    },
    blockquote: {
      fontStyle: 'italic',
      color: '#666',
      textAlign: 'center',
      margin: '20px 0',
      color: '#3ca5dc'
    },
    section: {
      marginBottom: '20px',
    },
    sectionHeader: {
      marginBottom: '10px',
      color: '#e0f7fa',
      textAlign: 'center'
    },
    listItem: {
      backgroundColor: '#e0f7fa',
      padding: '1px',
      marginLeft: -30,
      borderRadius: '5px',
      marginBottom: '10px',
      textAlign: "center"
    },
    iconButton: {
      cursor: 'pointer'
    }
  };

  return (

    <div style={styles.profileContainer}>
      <div style={styles.leftColumn}>
        <button onClick={isEditing ? handleSaveClick : handleEditClick}>
          <FontAwesomeIcon icon={isEditing ? faSave : faEdit} style={styles.iconButton} />
        </button>
        <div style={styles.imageContainer}>
          <img src={profile.imageSrc} alt={profile.name} style={styles.image} />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ margin: 20 }}
            />
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10 }}
          />
        ) : (
          <h2 style={styles.header}>{profile.name}</h2>
        )}
        {isEditing ? (
          <textarea
            name="quote"
            value={profile.quote}
            onChange={handleChange}
            style={{ width: '100%', height: '150px' }}
          />
        ) : (
          <blockquote style={styles.blockquote}>
            {profile.quote}
          </blockquote>
        )}

        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Ways to Earn</h3>
          <ul>
            <li style={styles.listItem}>Limited access to high-quality investment opportunities in desired sectors</li>
            <li style={styles.listItem}>Difficulty in finding transparent and trustworthy entrepreneurs and startups</li>
            <li style={styles.listItem}>Challenges in identifying ventures with both high scalability and meaningful societal impact</li>
          </ul>
        </div>
      </div>

      <div style={{ width: '70%', margin: 20 }}>

        <div style={styles.topRightColumn}>

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
          <section className="tokens-earned" style={tokensEarnedStyle}>
            <h2 style={tokensEarnedTitleStyle}>NFT Earned</h2>
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

        <div style={styles.bottomRightColumn}>
          <h3 style={styles.sectionHeader}>Contribute to Community</h3>
          <textarea
            name="blog"
            placeholder="Write your blog here..."
            value={profile.blog}
            onChange={handleChange}
            style={{ width: '100%', height: '50%' }}
          />
          <button style={{ marginTop: '20px' , backgroundColor:"#3ca5dc", borderRadius:20, color:'white', padding:8, marginRight:20}}>Save Blog</button>
          <button style={{ marginTop: '20px' , backgroundColor:"#3ca5dc", borderRadius:20, color:'white', padding:8}}>Your Blogs</button>
        </div>


      </div>
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
              style={{ color: "#3ca5dc", marginBottom: 20 }}
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
                    <Card onClick={() => handleCenterSelect(center)} style={{ height: 200, width: '100%', backgroundColor: "#192841" }}>
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
            <Card style={{ marginBottom: '20px', backgroundColor: "#192841" }}>
              <Card.Body >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <div style={{ width: '100%' }}>
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
                  </div>
                  <div style={{ width: '100%' }}>
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
                        min="09:00"
                        max="17:00"
                      />
                    </Form.Group>
                  </div>
                </div>
                <Button variant="primary" type="submit" style={submitButtonStyle}>
                  Book Appointment
                </Button>
                <Button variant="secondary" onClick={handleBackClick} style={submitButtonStyle}>
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
  marginTop: 40,
  marginLeft: -100,
  padding: '20px',
  backgroundColor: "white",
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
  height: '80%',
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
  width: '100%',
  marginRight: 20,
};

const submitButtonStyle = {
  marginTop: '20px',
  marginRight: 20,
  width: '3 0%',
  fontFamily: 'Verdana, Geneva, sans-serif',
  backgroundColor: "#3ca5dc",
  marginBottom: 30
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  overflowY: 'auto',
  borderRadius: '4px',
  height: 300
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
  color: 'white'
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
  marginLeft: '-5px'
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
  marginRight: 10,
  padding: '20px',
  backgroundColor: '#192841',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  margin: '20px auto',
  width: '50%',

};

const tokensEarnedTitleStyle = {
  color: 'white',
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
