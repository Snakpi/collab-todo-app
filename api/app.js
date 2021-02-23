const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { mountRouters } = require("./routes/index");

const app = express();
const SERVER_PORT = 5000;

app.use(morgan("dev"));
app.use(express.json());
mountRouters(app);

app.listen(SERVER_PORT, () => {
  console.log(`Server hosted at ${SERVER_PORT}`);
});
