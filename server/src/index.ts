require("dotenv").config();

import express from "express";
import { getVisits, incrementVisits } from "./dbClient";
const app = express();
const port = 3000;

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
    const count = await incrementVisits()
    res.send(`Hello visitor #${count}`);
  }
  catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
