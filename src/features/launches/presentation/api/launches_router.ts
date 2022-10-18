import { ConnectionError } from "../../../../core/errors/errors";
import { LaunchModel } from "../../data/models/launch_model";
import { GetLastUsecase } from "../../usecases/get_last_usecase";
import { GetNextUsecase } from "../../usecases/get_next_usecase";
import { GetPastUsecase } from "../../usecases/get_past";
import { GetUpcomingUsecase } from "../../usecases/get_upcoming_usecase";

const express = require("express");

export class LaunchesRouter {
  server;
  getNextUsecase: GetNextUsecase;
  getLastUsecase: GetLastUsecase;
  getUpcomingUsecase: GetUpcomingUsecase;
  getPastUsecase: GetPastUsecase;

  constructor(
    server,
    getNextUsecase: GetNextUsecase,
    getLastUsecase: GetLastUsecase,
    getUpcomingUsecase: GetUpcomingUsecase,
    getPastUsecase: GetPastUsecase
  ) {
    this.server = server;
    this.getNextUsecase = getNextUsecase;
    this.getLastUsecase = getLastUsecase;
    this.getUpcomingUsecase = getUpcomingUsecase;
    this.getPastUsecase = getPastUsecase;
  }

  next = async (req, res) => {
    try {
      const launch: LaunchModel = await this.getNextUsecase.execute();
      res.json(launch.toJson());
    } catch (e) {
      console.error(e);
      if (e instanceof ConnectionError) {
        res.status(503).json(e.msg);
      } else {
        res.status(500).json("Erro no servidor");
      }
    }
  };

  last = async (req, res) => {
    try {
      const launch: LaunchModel = await this.getLastUsecase.execute();
      res.json(launch.toJson());
    } catch (e) {
      console.error(e);
      if (e instanceof ConnectionError) {
        res.status(503).json(e.msg);
      } else {
        res.status(500).json("Erro no servidor");
      }
    }
  };

  upcoming = async (req, res) => {
    try {
      const launchList: Array<LaunchModel> =
        await this.getUpcomingUsecase.execute();
      res.json(launchList.map((launch) => launch.toJson()));
    } catch (e) {
      console.error(e);
      if (e instanceof ConnectionError) {
        res.status(503).json(e.msg);
      } else {
        res.status(500).json("Erro no servidor");
      }
    }
  };

  past = async (req, res) => {
    try {
      const launchList: Array<LaunchModel> =
        await this.getPastUsecase.execute();
      res.json(launchList.map((launch) => launch.toJson()));
    } catch (e) {
      console.error(e);
      if (e instanceof ConnectionError) {
        res.status(503).json(e.msg);
      } else {
        res.status(500).json("Erro no servidor");
      }
    }
  };

  start() {
    const router = express.Router();

    router.get("/launches/next", this.next);

    router.get("/launches/last", this.last);

    router.get("/launches/upcoming", this.upcoming);

    router.get("/launches/past", this.past);

    this.server.use("/", router);
  }
}
