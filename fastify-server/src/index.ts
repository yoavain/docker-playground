import { initDb, getVisits, incrementVisits } from "@docker-playground/db-client";
import type { FastifyInstance, FastifyServerOptions } from "fastify";
import Fastify from "fastify";

require("dotenv").config();

const TableName = "fastify-visits";

const fastifyServerOptions: FastifyServerOptions = {
    logger: {
        level: "info",
        file: "/usr/app/logs/fastify.log"
    }
};

const fastify: FastifyInstance = Fastify(fastifyServerOptions);


const startServer = async () => {
    try {
        const port = 3001;

        await initDb(TableName);

        fastify.get("/get", async (req, res) => {
            const count: number = await getVisits(TableName);
            return { message: `Total visitors: ${count}` };
        });

        fastify.get("/inc", async (req, res) => {
            const count: number = await incrementVisits(TableName);
            return { message: `Hello visitor #${count}` };
        });

        await fastify.listen(port, "0.0.0.0");
        console.log(`Fastify server listening on port ${port}!`);
    }
    catch (err) {
        fastify.log.error(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

startServer().catch(console.error);
