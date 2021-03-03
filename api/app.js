const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { mountRouters } = require("./routes/index");

const app = express();
const {SERVER_PORT} = process.env;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")))

mountRouters(app);

app.listen(SERVER_PORT, () => {
  console.log(`Server hosted at ${SERVER_PORT}`);
});
