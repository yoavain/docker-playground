require("dotenv").config();

import express from "express";
import { getVisits, incrementVisits, initDb } from "./dbClient";

const startServer = async () => {
  const app = express();
  const port = 3000;

  await initDb();

  app.get("/get", async (req, res) => {
    try {
      const count: number = await getVisits();
      res.send(`Total visitors: ${count}`);
    }
    catch (e) {
      res.status(500).send(`Error: ${e}`);
    }
  });

  app.get("/inc", async (req, res) => {
    try {
      const count: number = await incrementVisits()
      res.send(`Hello visitor #${count}`);
    }
    catch (e) {
      res.status(500).send(`Error: ${e}`);
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });

}

startServer().catch(console.error);