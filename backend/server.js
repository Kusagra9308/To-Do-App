const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./database/db");
const generalRoutes = require("./routes/general");
const generalRoutes2 = require("./routes/auth");


connectToDB();

const app = express();
const PORT = process.env.PORT ;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

app.use("/", generalRoutes);
app.use("/api/", generalRoutes2);

app.listen(PORT, () => {
  console.log(`Server is now listeining to PORT ${PORT}`);
});




