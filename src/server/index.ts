import express from "express";
import { getVisits, incrementVisits } from "./dbClient";
const app = express();
const port = 3000;

app.get("/get", async (req, res) => {
  const count: number =  await getVisits();
  res.send(`Total visitors: ${count}`);
});

app.get("/inc", async (req, res) => {
  const count = await incrementVisits()
  res.send(`Hello visitor #${count}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
