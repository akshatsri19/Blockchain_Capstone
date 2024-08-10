const express = require("express");
const cors = require("cors");

const tokenRoutes = require("./routes/tokenRoutes"); // Import token routes
const nftRoutes = require("./routes/nftRoutes"); // Import NFT routes

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

app.use("/api", tokenRoutes); // Use the token routes under "/api"
app.use("/api/nft", nftRoutes); // Use the NFT routes under "/api/nft"

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});