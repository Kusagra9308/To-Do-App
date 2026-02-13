const express = require("express");
const cors = require("cors");
const generalRou = require("./routes/generalRou");
require("dotenv").config();
const connectToDB = require("./database/db");
const generalRoutes = require("./routes/general");


connectToDB();

const app = express();
const PORT = process.env.PORT ;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

app.use("/", generalRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listeining to PORT ${PORT}`);
});




