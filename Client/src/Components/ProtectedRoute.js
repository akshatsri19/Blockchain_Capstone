import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../Firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          setUserRole(userData?.role || 'user');
        } catch (error) {
          console.error("Error fetching user role: ", error);
        }
      }
      setLoading(false);
    };
    fetchUserRole();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
