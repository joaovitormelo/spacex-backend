require("dotenv").config();
import * as moment from "moment-timezone";
moment.tz.setDefault("America/Sao_Paulo");

import { DefaultRoutesApi } from "./core/config/default_routes";
import { LaunchesInitializer } from "./features/launches/setup/launches_initializer";

const server = require("./core/config/server");

new LaunchesInitializer().init(server);

new DefaultRoutesApi(server).start();

console.log("Backend Running at port " + process.env.PORT + "!");
