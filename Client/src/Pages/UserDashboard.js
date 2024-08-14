import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../Firebase/FirebaseConfig.js';
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
import axios from 'axios';
import testImage from '../Assets/nft11.png';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';


const localIpAddress = '172.20.10.4';

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [account, setAccount] = useState(null);
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
      localStorage.removeItem('connectedAccount');
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
        return <Dashboard account={account} setAccount={setAccount} />;
      case 'book-appointment':
        return <BookAppointmentSection />;
      case 'my-appointments':
        return <MyAppointmentsSection appointments={appointments} account={account} />;
      default:
        return <Dashboard account={account} setAccount={setAccount} />;
    }
  };

  return (
    <div className={`dashboard ${open ? 'drawer-open' : 'drawer-closed'}`}>
      <header className={`app-bar ${open ? 'open' : 'closed'}`} style={{ backgroundColor: "white", boxShadow:'0 4px 6px rgba(0, 0, 0, 0.2)'  }}>
        <button className="menu-icon" onClick={toggleDrawer}>
          ☰
        </button>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/blogs" style={navLinkStyle}>Blogs</Nav.Link>
          <Nav.Link as={Link} to="/services" style={navLinkStyle}>Services</Nav.Link>
          <Nav.Link as={Link} to="/about" style={navLinkStyle}>About</Nav.Link>
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

const Dashboard = ({ account, setAccount }) => {
  const totalTokens = 5000;
  const earnedTokens = 1234;
  const [isEditing, setIsEditing] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const disconnectWallet = () => {
    setAccount(null); 
    setNfts([]);
    localStorage.removeItem('connectedAccount'); 
    alert('MetaMask wallet disconnected successfully!');
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedAccount = accounts[0];
        setAccount(connectedAccount);
        localStorage.setItem('connectedAccount', connectedAccount);
        alert(`MetaMask wallet connected successfully! Account: ${connectedAccount}`);
      } catch (error) {
        console.error('Error connecting MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to connect your wallet.');
    }
  };

  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (account) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5001/api/nft/nfts/${account}`);
          const nftData = response.data;
  
          if (nftData.length === 0) {
            setMessage('No NFTs found');
          } else {
            setNfts(nftData);
          }
        } catch (error) {
          console.error('Failed to fetch NFT data:', error);
          setMessage('Failed to fetch NFT data');
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchNFTs();
  }, [account]); 
  

  const styles = {
    profileContainer: {
      display: 'flex',
      marginLeft: "-20%",
      padding: '20px'
    },
    leftColumn: {
      padding: '20px',
      backgroundColor: '#89CFF0',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'justify',
      margin: '20px auto',
      color: '#192841',
      width:'40%'
    },
    topRightColumn: {
      display: 'flex',
      padding: '20px',
      backgroundColor: '#e0f7fa',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      flexDirection: 'row',
      height: '50%',
      width: '102%',
    },
    bottomRightColumn: {
      padding: '20px',
      backgroundColor: "#e0f7fa",
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      height: '50%',
      width: '102%',
      color: "#e0f7fa"
    },
    imageContainer: {
      textAlign: 'center',
    },
    image: {
      width: '160px',
      height: '180px',
      borderRadius: '50%',
      border: '3px solid #333',
      objectFit: 'fill',
    },
    header: {
      textAlign: 'center',
      marginTop: 20,
      color:"#192841" 
    },
    blockquote: {
      fontStyle: 'italic',
      color: '#666',
      textAlign: 'center',
      margin: '20px 0',
      color:"#192841" 
    },
    section: {
      marginBottom: '20px',
      backgroundColor:"#e0f7fa",
      padding:10,
      borderRadius:20
    },
    sectionHeader: {
      marginBottom: '10px',
      color:"#192841" ,
      textAlign: 'center',
      fontWeight:'bold'
    },
    listItem: {
      backgroundColor: '#e0f7fa',
      padding: '1px',
      marginLeft: -20,
      borderRadius: '5px',
      marginBottom: '10px',
      // textAlign: "center"
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
            style={{ width: '100%', marginBottom: 10}}
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
            <li style={styles.listItem}>Share your blood donation experiance to motivate others</li>
            <li style={styles.listItem}>Add a blog about out platform sharing your experience</li>
            <li style={styles.listItem}>Complete 5 donations to earn Trust Tokens</li>
          </ul> 
        </div>
      </div>

      <div style={{ width: '100%', margin: 20 }}>

       

        <div style={styles.bottomRightColumn}>
          <h3 style={styles.sectionHeader}>Share your experiance</h3>
          <textarea
            name="blog"
            placeholder="Write your blog here..."
            value={profile.blog}
            onChange={handleChange}
            style={{ width: '100%', height: '50%', borderColor:"white", borderRadius:10 }}
          />
          <button style={{ marginTop: '20px' , backgroundColor:"#3ca5dc", borderRadius:20, color:'white', padding:8, marginRight:20, borderColor:"#3ca5dc"}}>Save Blog</button>
          <button style={{ marginTop: '20px' , backgroundColor:"#3ca5dc", borderRadius:20, color:'white', padding:8, borderColor:"#3ca5dc"}}>Your Blogs</button>
        </div>

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
              <Button
                  variant={account ? "outline-danger" : "outline-success"}
                  style={actionButtonStyle}
                  onClick={account ? disconnectWallet : connectWallet}
                >
                  {account ? `Disconnect ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect MetaMask'}
                </Button>
              </div>
              {account && (
                <p style={{ marginTop: '10px', color: '#3ca5dc' }}>
                  Connected Wallet Address: {account}
                </p>
              )}
          </section>
          <section className="nfts-earned" style={tokensEarnedStyle}>
            <h2 style={tokensEarnedTitleStyle}>NFT Earned</h2>
            {loading ? (
          <p>Loading your NFTs...</p>
          ) : nfts.length > 0 ? (
          <div>
            <div className="nft-card-container">
            {nfts.map((nft) => (
                <div key={nft.tokenId} className="nft-card">
                <img src={testImage} alt="testImage" width="200" />
                {/* <p>Name: {nft.metadata.name}</p> */}
                {/* <p>Description: {nft.metadata.description}</p> */}
                    <div className="nft-details">
                        <p style={{color:"#3ca5dc", marginTop:10}}>Token ID: {nft.tokenId}</p>
                    </div>
                </div>
            ))}
            </div>
          </div>
          ) : (
          <p>{message}</p>
          )}
          </section>
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
  const [showPopup, setShowPopup] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "Are you 17 years old or more?",
    "Have you had a tattoo or piercing in the last three months?",
    "Have you travelled outside of Canada, the continental USA, Antarctica or Europe in the last 3 weeks?",
    "Have you been to the dentist for an extraction, surgery or root canal in the last three days?",
    "Are you pregnant, have been pregnant or had a baby in the last six months?",
    "Are you taking prescription medication(s)?",
    "Do you weigh more than 50 kg (110 lb.)?"
  ];


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
          confirmation: false
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

  const handleCheckEligibility = (answer) => {
    if (currentQuestion === 0) {
      if (answer === 'yes') {
        setCurrentQuestion(1);
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 1) {
      if (answer === 'no') {
        setCurrentQuestion(2);
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 2) {
      if (answer === 'no') {
        setCurrentQuestion(3);
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 3) {
      if (answer === 'no') {
        setCurrentQuestion(4); 
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 4) {
      if (answer === 'no') {
        setCurrentQuestion(5); 
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 5) {
      if (answer === 'no') {
        setCurrentQuestion(6); 
      } else {
        setIsEligible(false);
      }
    } else if (currentQuestion === 6) {
      if (answer === 'yes') {
        setIsFinished(true) ;
      } else {
        setIsEligible(false);
      }
    } else {
      handleClose();
    }
    alert('Eligibility check functionality to be implemented.');
  };

  const handleShow = () => {
    setShowPopup(true);
    setCurrentQuestion(0);
    setIsEligible(true);
    setIsFinished(false);
  };

  const handleClose = () => setShowPopup(false);

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
                <Button variant="secondary" onClick={handleShow} style={submitButtonStyle}>
                    Check Eligibility
                </Button>
                <Button variant="primary" type="submit" style={submitButtonStyle}>
                  Book Appointment
                </Button>
                <Button variant="secondary" onClick={handleBackClick} style={submitButtonStyle}>
                  Back
                </Button>
                <Modal show={showPopup} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Eligibility Check</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isEligible ? (
                isFinished ? (
                  <h5>Great! You are now ready to book an appointment to give blood.</h5>
                ) : (
                  <>
                    <h5>{questions[currentQuestion]}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button variant="success" onClick={() => handleCheckEligibility('yes')}>Yes</Button>
                      <Button variant="danger" onClick={() => handleCheckEligibility('no')}>No</Button>
                    </div>
                  </>
                )
              ) : (
                <h5>You are not eligible to donate blood.</h5>
              )}
            </Modal.Body>
          </Modal>
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

const MyAppointmentsSection = ({ appointments, account }) => {

  const [message, setMessage] = useState('');
  const [appointmentList, setAppointmentList] = useState([]);
  const [isClaimed, setIsClaimed] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAAFI4ON-NQGEu4KcpoIVrPaqkHjlqOE-8'
  });

  const fetchAppointments = async () => {
    try {
      const q = query(collection(db, 'appointments'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointmentList(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(); 
  }, []);

  const refreshAppointments = async () => {
    fetchAppointments(); 
  };

  const handleClaimNFT = async () => {
    try {
      const tokenURI = "https://example.com/nft-metadata"; 
      const response = await axios.post('http://localhost:5001/api/nft/claim', {
        userId: "xb9LwCGT4tXLel6LSHSIR0Y648r1",
        recipient: account,
        tokenURI,
      });

      if (response.data.success) {
        setMessage('NFT claimed successfully!');
        setIsClaimed(true);
      } else {
        setMessage('Failed to claim NFT');
      }

    } catch (error) {
      setMessage('Failed to claim NFT');
      console.error('Error claiming NFT:', error);
    }
  };

  return (
    <section style={sectionStyle1}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
      <h2 style={sectionTitleStyle}>My Appointments</h2>
      <button onClick={refreshAppointments} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faSyncAlt} size="lg" style={{ color: '#3ca5dc' }} />
        </button>
      </div>
      <ul style={listStyle1}>
        {appointmentList.map(appointment => (
          <li key={appointment.id} style={listItemStyle}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div>
              <div style={{ width: '100%', marginTop:30, marginRight:30, }}>
                <p><strong>Location:</strong> {appointment.location}</p>
                <p><strong>Donation Center:</strong> {appointment.donationCenter}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <QRCode value={`http://${localIpAddress}:3000/qrcode/${appointment.id}?account=${encodeURIComponent(account)}`} size={150} />
              {appointment.confirmation && (
                isClaimed ? (
                  <p style={{ color: '#3ca5dc', marginTop: '10px' }}>
                    Rewards Already Claimed
                  </p>
                ) : (
                  <Button variant="outline-primary" style={actionButtonStyle1} onClick={handleClaimNFT}>
                    Claim Rewards
                  </Button>
                )
              )}
              </div>
            </div>
            
            {isLoaded && (
              <div style={{ width: '50%', height: '400px', marginTop: '20px' }}>
                <GoogleMap
                  mapContainerStyle={{ width: '90%', height: '80%', borderRadius:20, marginLeft:75, marginTop:30 }}
                  center={{ lat: appointment.lat, lng: appointment.lng }}
                  zoom={14}
                  onLoad={map => {
                      new window.google.maps.Marker({
                      map,
                      position: { lat: appointment.lat, lng: appointment.lng },
                      title: appointment.donationCenter
                    });
                  }}
                >
                </GoogleMap>
              </div>
            )}
          </div>
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
  width: '110%',
  height: '100%',
  marginLeft:-150
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


const listStyle1 = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '95%',
  overflowY: 'auto',
  borderRadius: '5px',
};

const listItemStyle = {
  backgroundColor: '#3ca5dc',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  color: 'white'
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
  padding: '20px',
  backgroundColor: '#192841',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  marginRight:20,
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

const actionButtonStyle1 = {
  marginTop:20,
  width: '150px',
  fontFamily: 'Verdana, Geneva, sans-serif',
  backgroundColor:"#192841",
  color:"#3ca5dc",
  borderColor:"#192841"
};
