const express = require("express");

export class DefaultRoutesApi {
  server;

  constructor(server) {
    this.server = server;
  }

  start() {
    const router = express.Router();
    router.get("/", (req, res) =>
      res.json({ status: "SpaceX API Running..." })
    );
    router.all("*", function (req, res) {
      res.status(404).json({ noSuchRoute: true, err: true });
    });

    this.server.use("/", router);
  }
}
