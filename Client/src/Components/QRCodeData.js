import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import logo1 from "../Assets/Logo1.jpg"


const QRCodeData = () => {
  const { id } = useParams();
  const location = useLocation();
  const [account, setAccount] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [message, setMessage] = useState('');
  const [showH1, setShowH1] = useState(false);

  useEffect(() => {
    
    const queryParams = new URLSearchParams(location.search);
    const accountParam = queryParams.get('account');
    setAccount(accountParam);

    const fetchAppointment = async () => {
      const docRef = doc(db, 'appointments', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setAppointment(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchAppointment();
  }, [id, location.search]);

  const donationConfirmation = async () => {
    setShowH1(true);
    try {
      const docRef = doc(db, 'appointments', id);
  
      await updateDoc(docRef, {
        confirmation: true,
      });

      localStorage.setItem('refreshAppointments', 'true');
  
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        confirmation: true,
      }));
  
      setMessage('Donation Confirmed successfully!');
    } catch (error) {
      console.error('Error updating confirmation:', error);
      setMessage('Failed to confirm donation. Please try again.');
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', 
          alignItems: 'center'}}>
            <h1 style={brandStyle}>
              <span style={{ color: '#ab0a0f' }}>Trust</span>
              <span style={{ color: '#4299cf' }}>Blu</span>
            </h1>
            <img src={logo1} style={logoStyle} alt="Logo" />
        </div>
        <div style={{padding:20, textAlign:'justify'}}>
          <h2 style={{fontWeight:'bold'}}>Appointment Details</h2>
          <p><strong>Location:</strong> {appointment.location}</p>
          <p><strong>Donation Center:</strong> {appointment.donationCenter}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <button style = {buttonStyle} onClick={donationConfirmation}>Donation Confirmation</button>
          {message && <p>{message}</p>}
        </div>
      </div> 
  );
};

export default QRCodeData;

const brandStyle = {
  color: '#3ca5dc',
  fontFamily: 'Verdana, Geneva, sans-serif', 
  fontSize: '2.2rem', 
  fontStyle: 'italic',
  fontWeight: 'bold',
};

const logoStyle = {
  width: '20%',
  height: '20%',
  marginLeft: '-5px'
};

const buttonStyle = {
  backgroundColor:"#3ca5dc",
  color:'white',
  padding:10,
  borderRadius:10,
  fontSize:20,
  marginLeft:'22%'
}