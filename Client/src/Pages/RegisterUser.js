import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userRegister from "../Assets/userRegister.jpg";
import NavigationBar from "../Components/Navbar.js";
import { db, auth } from '../Firebase/FirebaseConfig.js';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const RegisterUser = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    donorNumber: '',
    dateOfBirth: {
      month: '',
      day: '',
      year: ''
    },
    postalCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dateOfBirth: {
        ...formData.dateOfBirth,
        [name]: value
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      // Registration logic
      if (formData.email !== formData.confirmEmail) {
        alert("Emails do not match.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        console.log("User registered with ID: ", user.uid);
  
        // Add additional user data to Firestore using UID as document ID
        const userData = { ...formData, role: 'user' }; // Default role can be 'user'
        delete userData.confirmEmail;
        delete userData.confirmPassword;
  
        await setDoc(doc(db, "users", user.uid), userData);
        console.log("Document written with ID: ", user.uid);
  
        // Redirect to the user dashboard after successful registration
        navigate('/userDashboard');
        
      } catch (error) {
        console.error("Error registering user: ", error);
        alert("Error registering user: " + error.message);
      }
    } else {
      // Login logic
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
  
        if (userData?.role === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
        console.log("User logged in with ID: ", user.uid);
      } catch (error) {
        console.error("Error logging in user: ", error);
        alert("Error logging in user: " + error.message);
      }
    }
  };
  

  return (
    <div>
      <NavigationBar />
      <div style={{ backgroundColor: "white"}}>
        <Container>
          <Row className="align-items-center">
            <div style={{display:'flex',flexDirection:"row", marginTop:100,marginLeft:"45%"}}>
            <Button
                variant="primary"
                className="m-2"
                style={{ backgroundColor: isSignup ? "#3ca5dc" : "#d2d3d6", borderColor: isSignup ? "#3ca5dc" : "#d2d3d6", color: isSignup ? "#d2d3d6" : "#3ca5dc", borderRadius:20, width:"10%"}}
                onClick={() => setIsSignup(true)}
              >
                Signup
              </Button>
              <Button
                variant="secondary"
                className="m-2"
                style={{ backgroundColor: isSignup ? "#d2d3d6" : "#3ca5dc", borderColor: isSignup ? "#d2d3d6" : "#3ca5dc", color: isSignup ? "#3ca5dc" : "#d2d3d6", borderRadius:20 , width:"10%"}}
                onClick={() => setIsSignup(false)}
              >
                Login
              </Button>
            </div>
            <Col md={7} className="d-none d-md-block" style={{ paddingRight:"30px", marginTop:10, marginBottom:150 }}>
              <h2 className="text-black">You are just a step away!</h2>
              <p className="text-black">
                Complete the form to create an account. Once you've completed the required
                information, proceed to the next step.
              </p>
              <p className="text-black">Thank you for being part of Canada's lifeline.</p>
              <img
                src={userRegister}
                alt="Description of the image"
                style={{ width: '100%', height: 'auto', marginTop: 20 }}
              />
            </Col>
            <Col md={5} style={{ paddingLeft: '30px', height: '600px', overflowY: 'auto' }}>
              <Form onSubmit={handleSubmit}>
                {isSignup ? (
                  <>
                    <Form.Group controlId="formEmail">
                      <Form.Label className="text-black">Email address (this will be your username) *</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formConfirmEmail">
                      <Form.Label className="text-black">Confirm email address *</Form.Label>
                      <Form.Control type="email" placeholder="Confirm email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formFirstName">
                      <Form.Label className="text-black">First name *</Form.Label>
                      <Form.Control type="text" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                      <Form.Label className="text-black">Last name *</Form.Label>
                      <Form.Control type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDonorNumber">
                      <Form.Label className="text-black">Donor number</Form.Label>
                      <Form.Control type="text" placeholder="Enter your donor number (if you have one)" name="donorNumber" value={formData.donorNumber} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDateOfBirth">
                      <Form.Label className="text-black">Date of birth *</Form.Label>
                      <Row>
                        <Col xs={4}>
                          <Form.Control type="text" placeholder="Month" name="month" value={formData.dateOfBirth.month} onChange={handleDateChange} />
                        </Col>
                        <Col xs={4}>
                          <Form.Control type="text" placeholder="Day" name="day" value={formData.dateOfBirth.day} onChange={handleDateChange} />
                        </Col>
                        <Col xs={4}>
                          <Form.Control type="text" placeholder="Year" name="year" value={formData.dateOfBirth.year} onChange={handleDateChange} />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group controlId="formPostalCode">
                      <Form.Label className="text-black">Postal code *</Form.Label>
                      <Form.Control type="text" placeholder="Postal code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label className="text-black">Phone number *</Form.Label>
                      <Form.Control type="text" placeholder="Phone number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label className="text-black">Password *</Form.Label>
                      <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                      <Form.Text style={{ color: 'black' }}>
                        Passwords must contain:
                        <ul>
                          <li>Minimum 8 characters</li>
                          <li>At least one capital letter</li>
                          <li>At least one lowercase letter</li>
                          <li>At least one number</li>
                          <li>No spaces</li>
                          <li>No invalid characters: %</li>
                        </ul>
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label className="text-black">Confirm password *</Form.Label>
                      <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: 20, marginBottom: 20, backgroundColor:"#3ca5dc", borderColor:"#3ca5dc"  }}>
                      Next
                    </Button>
                  </>
                ) : (
                  <>
                    <Form.Group controlId="formEmail">
                      <Form.Label className="text-black">Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label className="text-black">Password</Form.Label>
                      <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formShowPassword">
                      <Form.Check type="checkbox" label="Show Password" onChange={togglePasswordVisibility} checked={showPassword} />
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: 20, marginBottom: 20, backgroundColor:"#3ca5dc", borderColor:"#3ca5dc"  }}>
                      Login
                    </Button>
                  </>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterUser;
