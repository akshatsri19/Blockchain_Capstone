import React, { useEffect, useRef,useState } from 'react';
import backgroundImage from '../Assets/Background.webp';
import { Link } from 'react-router-dom';
import { Button, Card} from 'react-bootstrap';
import nft1 from "../Assets/nft.jpg";
import colab1 from "../Assets/Walmart_1.jpg";
import colab2 from "../Assets/RBC.jpg";
import colab3 from "../Assets/SikhNation.jpg";
import colab4 from "../Assets/Netflix.webp";
import whyDonate from "../Assets/bloodinfographic.jpg";
import Modal from 'react-bootstrap/Modal';
import g1 from "../Assets/g1.jpg"
import g2 from "../Assets/g2.jpg"
import g3 from "../Assets/g3.jpg"
import g4 from "../Assets/g4.jpg"
import NavigationBar from '../Components/Navbar';


const Home = () => {
  const h1Ref = useRef(null);
  const imgRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isEligible, setIsEligible] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const handleShow = () => {
    setShowPopup(true);
    setCurrentQuestion(0);
    setIsEligible(true);
    setIsFinished(false);
  };

  const handleClose = () => setShowPopup(false);

  const questions = [
    "Are you 17 years old or more?",
    "Have you had a tattoo or piercing in the last three months?",
    "Have you travelled outside of Canada, the continental USA, Antarctica or Europe in the last 3 weeks?",
    "Have you been to the dentist for an extraction, surgery or root canal in the last three days?",
    "Are you pregnant, have been pregnant or had a baby in the last six months?",
    "Are you taking prescription medication(s)?",
    "Do you weigh more than 50 kg (110 lb.)?"
  ];

  const handleNextQuestion = (answer) => {
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
  };

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = mediaQueryStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);



  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = h1VisibleStyle.opacity;
          entry.target.style.transform = h1VisibleStyle.transform;
        }
      });
    });

    if (h1Ref.current) {
      observer.observe(h1Ref.current);
    }

    imgRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      if (h1Ref.current) {
        observer.unobserve(h1Ref.current);
      }
      imgRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div>
      <NavigationBar />
      <div style={homeStyle}>

        <div style={backgroundStyle}></div>
        <div style={overlayStyle}></div>

        <div style={textContainerStyle}>
          <p style={headingStyle}>Small Initiatives, Big Impact</p>
          <p style={paragraphStyle}>
            As dedicated blood donors, we noticed a lack of awareness and motivation for blood
            donation. This inspired us to create TrustBlu, a blockchain platform that uses NFTs to reward
            donors, celebrate their contributions, and strengthen community bonds. Our mission is to make blood donation more engaging and
            impactful.
          </p>
          <Button as={Link} to="/about" variant="outline-light" style={buttonStyle}>Learn more</Button>
        </div>
      </div>

      <div style={{ background: 'white', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={horizontalScrollStyle}>
          {Array(12).fill().map((_, index) => (
            <img src={nft1} alt={`Item ${index + 1}`} style={imageStyle} key={index} />
          ))}
        </div>

        <div ref={h1Ref} style={eligibilityStyle}>
          <h3 style={headingStyleE}>Check Your Eligibility!</h3>
          <h3 style={headingStyleE}>Check Your Eligibility!</h3>
            <Button onClick={handleShow} style={{backgroundColor:"#2E5984", borderColor:"#2E5984"}}>
            Open Eligibility Check
            </Button>
            <h3 style={headingStyleE}>Check Your Eligibility!</h3>
            <h3 style={headingStyleE}>Check Your Eligibility!</h3>
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
                      <Button variant="success" onClick={() => handleNextQuestion('yes')}>Yes</Button>
                      <Button variant="danger" onClick={() => handleNextQuestion('no')}>No</Button>
                    </div>
                  </>
                )
              ) : (
                <h5>You are not eligible to donate blood.</h5>
              )}
            </Modal.Body>
          </Modal>
        </div>

        <div style={sectionStyle}>
          <div style={textContainerStyle1}>
            <h2>Why Donate Blood ?</h2>
            <p style={{textAlign:'justify'}}>The need is constant and critical for our health care 
              system, says Marissa Absi, a member of the UOttawa Med Blood Team.Half of Canadians will 
              need blood or know someone who needs a transfusion at some point in their lives, yet only 
              four per cent of Canadians who are eligible actually donate, Grant said. 
              “We really need to work hard to bring those numbers up and engage more people in 
              conversation about blood, and really get people to make the connection that when they go 
              and donate for a stranger, it’s almost like they are donating for their own friend or 
              family member,” says Grant in a phone interview. New blood donors are also needed because 
              regular blood donors may be taking a break during the holidays, says Grant. “There’s 
              not a lot of things that are in our control during the pandemic, but this is something 
              you can really do to help get out there and really support another family whose situation 
              might be quite worse than your own,” says Grant.</p>
          </div>
          <img src={whyDonate} alt="Why Donate Blood" style={whyDonateStyle} />
        </div>

        <div style={collaboratorsContainerStyle}>
        <h2 style={{textAlign: 'center', color:"white" }}>Our Collaborators</h2>
        <p style={{ textAlign: 'justify', color: 'white', margin: '20px 0', marginBottom:50 }}>
          We are proud to collaborate with these amazing organizations and individuals 
          who share our mission and values. Their support and partnership help us achieve our goals 
          and make a positive impact.Our collaborators come from diverse backgrounds and industries, 
          bringing a wealth of knowledge and experience that enriches our work.From innovative tech 
          companies to grassroots community organizations, our collaborators are committed to driving 
          change and creating a better future. We work together on a variety of projects, each aimed at 
          making a meaningful difference in the world. Learn more about each of our collaborators below 
          and discover how they are contributing to our shared vision.
        </p>
          <div style={collaboratorCardWrapperStyle}>
            <Card ref={imgRefs[0]} className="collaborator-card" style={{ ...collaboratorCardStyle, ...leftCardStyle }}>
              <Card.Img variant="top" src={colab1} style={{marginTop:15 ,height: "60%", width:"80%" }} />
              <Card.Body>
                <Card.Text>
                  Some description about collaborator 1.
                </Card.Text>
                <Button variant="primary" as={Link} to="/collaborator1">Read More</Button>
              </Card.Body>
            </Card>
            <Card ref={imgRefs[1]} className="collaborator-card" style={{ ...collaboratorCardStyle, ...rightCardStyle }}>
              <Card.Img variant="top" src={colab2} style={{marginTop:15 ,height: "60%", width:"80%" }} />
              <Card.Body>
                <Card.Text>
                  Some description about collaborator 2.
                </Card.Text>
                <Button variant="primary" as={Link} to="/collaborator2">Read More</Button>
              </Card.Body>
            </Card>
          </div>
          <div style={collaboratorCardWrapperStyle}>
            <Card ref={imgRefs[2]} className="collaborator-card" style={{ ...collaboratorCardStyle, ...leftCardStyle }}>
              <Card.Img variant="top" src={colab3} style={{marginTop:15 ,height: "60%", width:"80%" }} />
              <Card.Body>
                <Card.Text>
                  Some description about collaborator 3.
                </Card.Text>
                <Button variant="primary" as={Link} to="/collaborator3">Read More</Button>
              </Card.Body>
            </Card>
            <Card ref={imgRefs[3]} className="collaborator-card" style={{ ...collaboratorCardStyle, ...rightCardStyle }}>
              <Card.Img variant="top" src={colab4} style={{marginTop:15 ,height: "60%", width:"80%" }} />
              <Card.Body>
                <Card.Text>
                  Some description about collaborator 4.
                </Card.Text>
                <Button variant="primary" as={Link} to="/collaborator4">Read More</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div style={containerStyle}>
      <div style={contentStyle}>
        <h2>Donation Process</h2>
        <div style={flexContainerStyle}>
          <div style={cardStyle}>
            <img src={g1} alt="Registration" style={imgStyle} />
            <h3>Registration</h3>
            <p>1. Fill out a registration form to become a blood donor.</p>
          </div>
          <div style={cardStyle}>
            <img src={g2} alt="Health Check" style={imgStyle} />
            <h3>Health Check</h3>
            <p>2. Undergo a brief health check to ensure eligibility.</p>
          </div>
          <div style={cardStyle}>
            <img src={g3} alt="Donation" style={imgStyle} />
            <h3>Donation</h3>
            <p>3. Donate blood safely and comfortably.</p>
          </div>
          <div style={cardStyle}>
            <img src={g4} alt="Refreshments" style={imgStyle} />
            <h3>Refreshments</h3>
            <p>4. Enjoy refreshments to help your body recover.</p>
          </div>
        </div>
      </div>
    </div>

    <div style={blogSectionStyle}>
      <h2>Latest Blog Posts</h2>
      <div style={blogPostsContainerStyle}>
        <div style={{margin:10, flex: '1 1 300px'}}>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 1" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>Understanding Blockchain for Blood Donation</h5>
              <p>A deep dive into how blockchain technology is used to track blood donations and rewards.</p>
              <h4><Link to="/blog/post1" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 2" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>The Importance of Regular Blood Donations</h5>
              <p>Why regular blood donations are crucial and how they help the community.</p>
              <h4><Link to="/blog/post2" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 3" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>How NFTs are Revolutionizing Charity Work</h5>
              <p>Exploring the impact of NFTs on charitable causes and community support.</p>
              <h4><Link to="/blog/post3" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
        </div>
        <div style={{margin:10, flex: '1 1 300px'}}>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 4" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>Understanding Blockchain for Blood Donation</h5>
              <p>A deep dive into how blockchain technology is used to track blood donations and rewards.</p>
              <h4><Link to="/blog/post1" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 5" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>The Importance of Regular Blood Donations</h5>
              <p>Why regular blood donations are crucial and how they help the community.</p>
              <h4><Link to="/blog/post2" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
          <div className="blog-post" style={blogPostStyle}>
            <img src={nft1} alt="Blog Post 6" style={blogPostImageStyle} />
            <div>
              <h5 style={{textAlign:'center'}}>How NFTs are Revolutionizing Charity Work</h5>
              <p>Exploring the impact of NFTs on charitable causes and community support.</p>
              <h4><Link to="/blog/post3" style={{color:"#3ca5dc"}}>Read more</Link></h4>
            </div>
          </div>
        </div>
      </div>
      <Button as={Link} to="/blog" variant="outline-primary" style={blogButtonStyle}>Read All Blog Posts</Button>
    </div>

      <style jsx>{`
        .collaborator-card {
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .collaborator-card:hover {
          background-color: #3ca5dc;
          color: white;
        }

        .blog-post {
          background-color: white;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .blog-post:hover {
          background-color: #2E5984;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Home;

const homeStyle = {
  position: 'relative',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  color: 'black',
  paddingLeft: '2rem',
  overflow: 'hidden'
};

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: -1
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: 0.6,
  zIndex: 0
};

const textContainerStyle = {
  maxWidth: '80%',
  paddingRight: '5rem',
  position: 'relative',
  zIndex: 1,
  transform: 'translateY(-30%)'
};

const headingStyle = {
  fontSize: '5vw',
  color: 'white',
  '@media (max-width: 768px)': {
    fontSize: '8vw',
  },
  '@media (max-width: 576px)': {
    fontSize: '10vw',
  },
};

const headingStyleE = {
  fontSize: '2vw',
  color: '#3ca5dc',
  '@media (max-width: 768px)': {
    fontSize: '4vw',
  },
  '@media (max-width: 576px)': {
    fontSize: '6vw',
  },
};

const paragraphStyle = {
  fontSize: '1.5vw',
  color: 'white',
  '@media (max-width: 768px)': {
    fontSize: '3vw',
  },
  '@media (max-width: 576px)': {
    fontSize: '4vw',
  },
};

const buttonStyle = {
  backgroundColor: '#d2d3d6',
  color: '#3ca5dc',
  borderColor: 'black',
  fontWeight: 'bold',
  padding: '10px 20px',
  marginTop: '20px',
  fontSize: '1vw',
  '@media (max-width: 768px)': {
    fontSize: '3vw',
  },
  '@media (max-width: 576px)': {
    fontSize: '4vw',
  },
};

const sectionStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  marginTop: 20,
  justifyContent: 'space-evenly',
  width:"100%"
};

const textContainerStyle1 = {
  flex: '1 1 100%',
  maxWidth: '600px',
  padding: '10px',
  '@media (min-width: 768px)': {
    flex: '1 1 50%',
    padding: '20px',
  },
};

const whyDonateStyle = {
  width: '60%',
  height: 500,
  padding: '10px',
  '@media (min-width: 768px)': {
    flex: '1 1 50%',
    padding: '20px',
  },
};

const imageStyle = {
  flex: '0 0 auto',
  width: '150px',
  height: '150px',
  margin: '10px',
  '@media (max-width: 768px)': {
    width: '120px',
    height: '120px',
    margin: '8px',
  },
  '@media (max-width: 576px)': {
    width: '100px',
    height: '100px',
    margin: '6px',
  },
};

const horizontalScrollStyle = {
  overflowX: 'scroll',
  whiteSpace: 'nowrap',
  display: "flex",
  flexDirection: "row",
  marginLeft: "5%",
  marginRight: "5%",
  position: 'relative',
  transform: 'translateY(-105%)',
  backgroundColor: "white",
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
  borderRadius: 20,
  '@media (max-width: 768px)': {
    padding: '8px',
  },
  '@media (max-width: 576px)': {
    padding: '6px',
  },
};


const eligibilityStyle = {
  width:"100%",
  transform: 'translateX(-100%)',
  transition: 'opacity 1s ease-out, transform 1s ease-out',
  marginTop: -120,
  marginBottom: 50,
  display:'flex',
  justifyContent:"space-between",
  flexDirection:'row',
  padding:10,
  color:"#3ca5dc",
  '@media (max-width: 768px)': {
    padding: '15px',
  },
  '@media (max-width: 576px)': {
    padding: '10px',
  },
};

const h1VisibleStyle = {
  opacity: 1,
  transform: 'translateX(0)'
};

const collaboratorsContainerStyle = {
  background:"#2E5984",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 1,
  padding: '2rem'
};

const collaboratorCardWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '80%',
  marginBottom: '2rem',
};

const collaboratorCardStyle = {
  width: '45%',
  opacity: 0,
  transition: 'opacity 1s ease-out, transform 1s ease-out',
  margin: '0 50px',
  height: 300,
  borderRadius: 20,
  alignItems:"center",
  borderColor:"#3ca5dc",
  '@media (max-width: 768px)': {
      width: 'calc(100% - 20px)',
    },
};

const leftCardStyle = {
  transform: 'translateX(-100%)'
};

const rightCardStyle = {
  transform: 'translateX(100%)'
};

const blogSectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: '2rem',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  margin: 'auto',
  maxWidth: '100%'
};

const blogPostsContainerStyle = {
  display: 'flex',
  gap: '1.5rem',
  marginTop:30
};

const blogPostStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '1rem',
  borderRadius: 10,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  marginBottom:50,

};

const blogPostImageStyle = {
  width: 150,
  height: 150,
  objectFit: 'cover',
  borderRadius: 10,
};

const blogButtonStyle = {
  marginTop: '1rem',
  backgroundColor: '#2E5984',
  color: 'white',
  borderColor: '#2E5984',
  fontWeight: 'bold',
};

const containerStyle = {
  background: '#f8f9fa',
  padding: '50px 0',
};

const contentStyle = {
  maxWidth: '98%',
  margin: '0 auto',
  textAlign: 'center',
};

const flexContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const cardStyle = {
  flex: '1 1 300px',
  padding: '20px',
  backgroundColor: '#e3e3e3',
  borderRadius: '2px',
  margin: '10px',
  boxSizing: 'border-box', // Ensure padding and margin are included in width/height
};

const imgStyle = {
  width: '100%',
  height: '70%',
  marginBottom: '10px',
};

const mediaQueryStyles = `
    @media (max-width: 768px) {
      .blog-post {
        width: 100%;
      }
      .blog-post-container {
        flex-direction: column;
        align-items: center;
      }
    }
  `;