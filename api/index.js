const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { mountRouters } = require("./routes/index");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

mountRouters(app);
