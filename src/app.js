const express = require("express");

const app = express();

app.use("/health", (req, res) => {
  res.send("Hello from server");
});

app.listen(3001, () => {
  console.log("Server is successfully listening on port 3001...");
});
