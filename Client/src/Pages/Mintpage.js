// import React, {useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import '../App.css'
// // ABIs
// import Mintabi from '../abis/Mint.json' //RealEstate
// import Mainabi from '../abis/Main.json' //Escrow


// // Config
// import config from '../config.json';
// import axios from 'axios';



// const Mintpage = () => {
//   const [mint, setMint] = useState(null)
//   const [owners, setOwners] = useState([])
//   const [myNFT, setMyNFT] = useState([])
//   const [totalSupply, setTotalSupply] = useState(null)
//   const [listed, setListed] = useState([])
//   const [events, setEvents] = useState([]);
//   const [ipfs, setIPFS] = useState('');
//   const [address, setAddressto] = useState('');
//   const [provider, setProvider] = useState(null)
//   const [main, setMain] = useState(null)
//   const [account, setAccount] = useState(null)
//   const [members, setMembers] = useState([])
//   const [member, setMember] = useState({})
//   const [toggle, setToggle] = useState(false);
//   useEffect(() => {
//     loadBlockchainData()
//   }, [])
//   const callmint = async () => {
//     console.log(mint)
//     console.log(account)
//     console.log(ipfs)
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner()
//     const transaction = await mint.connect(signer).mint(account, ipfs)
//     alert("Mint Successful")
    
//   }
//   const handleMint = async() => {
//     callmint()
//   }

//   //Connection to the ethereum
//   const loadBlockchainData = async() => {
//     const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
//     const account = ethers.utils.getAddress(accounts[0])
//     setAccount(account)
//     window.ethereum.on('accountsChanged', async () => {
//       const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
//       const account = ethers.utils.getAddress(accounts[0])
//       setAccount(account);
//     })
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     //setProvider(provider)
//     //Different blockchain will have different network (For this application, check config.json)
//     const network = await provider.getNetwork()
    
    
    
//     //loading the two contracts
//     const mint = new ethers.Contract(config[network.chainId].mint.address, Mintabi, provider)
//     console.log(mint)
//     setMint(mint)
//     const totalSupply = await mint.totalSupply()
//     //how many avaliable
//     setTotalSupply(totalSupply)
//     const members = []
//     const owners = []
//     const mynft = []
//     const listedNFT = []
//     for (var i = 1; i <= totalSupply; i++){
//       const uri = await mint.tokenURI(i)
//       const owner = await mint.ownerOf(i)
//       //console.log(account)
//       //console.log(owner)
//       //console.log(uri)
//       const response = await fetch(uri)
//       //console.log(response)
//       const metadata = await response.json()
//       if (owner === account){
//         mynft.push(metadata)
//       }
//       owners.push(owner)
//       members.push(metadata)
//     }
//     setMyNFT(mynft)
//     setOwners(owners)
//     setMembers(members)

//   }

  

//   const togglePop = (member) => {
//     console.log(member)
//     setMember(member)
//     toggle ? setToggle(false) : setToggle(true)
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Block</h1>  
//       <h1>Block</h1>  
//       <h1>Block</h1>  
//       <h2>Mint Page</h2>
      
//         <input
//           type="text"
//           value={ipfs}
//           onChange={(e) => setIPFS(e.target.value)}
//           placeholder="IPFS Link"
//           style={{
//             padding: '10px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             width: '300px',
//             maxWidth: '100%'
//           }}
//         />
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddressto(e.target.value)}
//           placeholder="To Address"
//           style={{
//             padding: '10px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             width: '300px',
//             maxWidth: '100%'
//           }}
//         />
//         <br />
//         <button onClick={handleMint} style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           transition: 'background-color 0.3s ease'
//         }}>
//           Mint
//         </button>

//       <div className='cards'>
//           {members.map((member, index)=>(
//             <div className='card' key={index} onClick={()=> togglePop(member)}>
//               <div className='card__image'>
//                 <img src={member.attributes[0].stage1[0].value} alt ="Home" />
//               </div>
//               <div className='card__info'>
//                 <h4>{member.attributes[0].stage1[1].value}</h4>
//                 <p>
//                   <strong>{member.name}</strong> 
                  
//                 </p>
//                 <p>Description: {member.description}</p>
//                 <p>Mint Date: {member.Mint_Date}</p>
//               </div>
//             </div>
//           ))}   
//         </div>
//     </div>
//   );
// };

// export default Mintpage;
