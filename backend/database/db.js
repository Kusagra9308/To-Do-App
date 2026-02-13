require("dotenv").config();
const express = require("express");
const connectToDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
