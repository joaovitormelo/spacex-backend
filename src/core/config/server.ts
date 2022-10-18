const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const corsOptions = {
  credentials: true,
  origin: ["*"],
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {});

module.exports = app;
