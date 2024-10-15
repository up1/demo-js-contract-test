const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/users", routes);

app.listen(3000, () => {
  console.log("Backend server running on port 3000");
});
