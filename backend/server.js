const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./database/db");
const taskRoutes = require("./routes/general");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

/* ---------- START SERVER ---------- */
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server not started due to DB error");
  });





