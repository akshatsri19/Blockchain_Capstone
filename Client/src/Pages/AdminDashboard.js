import React, { useState, useEffect } from "react";
import '../Styles/Admin.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../Firebase/FirebaseConfig.js';
import { useNavigate, Link } from 'react-router-dom';
import {Dropdown, Nav} from 'react-bootstrap';
import logo1 from "../Assets/Logo1.jpg"


const AdminDashboard = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardPoolBalance, setRewardPoolBalance] = useState("");
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [taskId, setTaskId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [taskDetails, setTaskDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleSingleMint = async () => {
    const response = await fetch("http://localhost:5001/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient, amount })
    });

    const data = await response.json();
    console.log(data.message);
  };

  const handleBatchMint = async () => {
    const recipientsArray = recipients.split(",").map(addr => addr.trim());
    const amountsArray = amounts.split(",").map(amount => amount.trim());

    const response = await fetch("http://localhost:5001/api/batch-mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipients: recipientsArray, amounts: amountsArray })
    });

    const data = await response.json();
    console.log(data.message);
  };

  const handleAddOrUpdateTask = async () => {
    const response = await fetch("http://localhost:5001/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ taskId, rewardAmount, isActive })
    });

    const data = await response.json();
    console.log(data.message);
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/task/${taskId}`);
      const data = await response.json();
      setTaskDetails(data.task);
    } catch (error) {
      console.error("Failed to fetch task details", error);
    }
  };

  const fetchRewardPoolBalance = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/rewardpool-balance");
      const data = await response.json();
      setRewardPoolBalance(data.balance);
    } catch (error) {
      console.error("Failed to fetch reward pool balance", error);
    } finally {
      setLoadingBalance(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/nft/notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleMintNFT = async (notificationId) => {
    try {
      const response = await fetch("http://localhost:5001/api/nft/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notificationId })
      });

      const data = await response.json();
      console.log(data.message);
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mint NFT", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  useEffect(() => {
    fetchRewardPoolBalance();
    fetchNotifications();
  }, []);

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

  return (
    <div>
      <div>
      <header style={{ backgroundColor: "#192841", display:'flex',flexDirection:'row', justifyContent:'space-between', height:70 }}>
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
    </div>
    <div className="container">
        <h1>Admin Page</h1>
        <div className="card-container">
            <div className="card">
                <h2>Reward Pool Balance</h2>
                {loadingBalance ? (
                    <p>Loading...</p>
                ) : (
                    <p>{rewardPoolBalance} TRUST</p>
                )}
            </div>

            <div className="card">
                <h2>Pending NFT Claims</h2>
                <ul>
                  {notifications.map(notification => (
                    <li key={notification.id}>
                      <p>Recipient: {notification.recipient}</p>
                      <button onClick={() => handleMintNFT(notification.id)}>Mint NFT</button>
                    </li>
                  ))}
                </ul>
            </div>
{/* 
            <div className="card">
                <h2>Mint to Recipient</h2>
                <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSingleMint}>Mint Tokens</button>
            </div> */}

            <div className="card">
                <h2>Batch Mint for Airdrops</h2>
                <textarea
                placeholder="Recipient Addresses (comma-separated)"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                />
                <textarea
                placeholder="Amounts (comma-separated)"
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                />
                <button onClick={handleBatchMint}>Batch Mint Tokens</button>
            </div>

            <div className="card">
                <h2>Add or Update Task</h2>
                <input
                type="text"
                placeholder="Task ID"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                />
                <input
                type="text"
                placeholder="Reward Amount"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  Is Active
                </label>
                <button onClick={handleAddOrUpdateTask}>Add/Update Task</button>
            </div>

            <div className="card">
                <h2>Get Task Details</h2>
                <input
                type="text"
                placeholder="Task ID"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                />
                <button onClick={fetchTaskDetails}>Fetch Task Details</button>
                {taskDetails && (
                    <div>
                        <p>Reward Amount: {taskDetails.rewardAmount} TRUST</p>
                        <p>Is Active: {taskDetails.isActive ? "Yes" : "No"}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    </div>
    
  );
};

export default AdminDashboard;

const navLinkStyle = {
  color: '#3ca5dc',
  fontSize: '1.2rem',
  marginLeft: '20px',
  textDecoration: 'none'
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
  height:50,
  marginLeft: '-5px'
};

const dropdownToggleStyle = {
  color: '#3ca5dc',
  border: 'none',
  fontSize: 25
};