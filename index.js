const express = require("express");

const router = require("./src/routes");

const app = express();

app.use(express.json());

const PORT = 5000;

app.use("/api/v1/", router);

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
