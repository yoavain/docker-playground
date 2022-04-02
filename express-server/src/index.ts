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
            res.contentType("application/json").send({ message: `Total visitors: ${count}` });
        }
        catch (e) {
            res.status(500).contentType("application/json").send({ error: e.message, stack: e.stack });
        }
    });

    app.get("/inc", async (req, res) => {
        try {
            const count: number = await incrementVisits();
            res.contentType("application/json").send({ message: `Hello visitor #${count}` });
        }
        catch (e) {
            res.status(500).contentType("application/json").send({ error: e.message, stack: e.stack });
        }
    });

    app.listen(port, () => {
        console.log(`Express server listening on port ${port}!`);
    });

};

startServer().catch(console.error);
