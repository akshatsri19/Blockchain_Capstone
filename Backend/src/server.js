const express = require("express");
const cors = require("cors");

const tokenRoutes = require("./routes/tokenRoutes"); // Import token routes

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

app.use("/api", tokenRoutes); // Use the token routes under "/api"

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});