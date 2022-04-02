require("dotenv").config();

import express from "express";
import { initDb, getVisits, incrementVisits } from "@docker-playground/db-client";

const TableName = "express-visits";

const startServer = async () => {
    const app = express();
    const port = 3000;

    await initDb(TableName);

    app.get("/get", async (req, res) => {
        try {
            const count: number = await getVisits(TableName);
            res.contentType("application/json").send({ message: `Total visitors: ${count}` });
        }
        catch (e) {
            res.status(500).contentType("application/json").send({ error: e.message, stack: e.stack });
        }
    });

    app.get("/inc", async (req, res) => {
        try {
            const count: number = await incrementVisits(TableName);
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
