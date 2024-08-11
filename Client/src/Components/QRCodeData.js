import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';


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
  
      // Update the local state to reflect the change
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
      {console.log("Button rendering")}
      <h2>Appointment Details</h2>
      <p><strong>Location:</strong> {appointment.location}</p>
      <p><strong>Donation Center:</strong> {appointment.donationCenter}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Confirmation:</strong> {appointment.confirmation.toString()}</p>
      <button onClick={donationConfirmation}>Donation Confirmation</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QRCodeData;
