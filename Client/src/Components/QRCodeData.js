import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const QRCodeData = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  

  useEffect(() => {
    const fetchAppointment = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'appointments', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAppointment(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Appointment Details</h2>
      <p><strong>Location:</strong> {appointment.location}</p>
      <p><strong>Donation Center:</strong> {appointment.donationCenter}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <button>Verify</button>
    </div>
  );
};

export default QRCodeData;
