require("dotenv").config();

const cors = require("cors");

const express = require("express");

const router = require("./src/routes");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
