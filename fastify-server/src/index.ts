import type { FastifyInstance, FastifyServerOptions } from "fastify";
import Fastify from "fastify";
import { getVisits, incrementVisits, initDb } from "./dbClient";

require("dotenv").config();

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

        await initDb();

        fastify.get("/get", async (req, res) => {
            const count: number = await getVisits();
            return { message: `Total visitors: ${count}` };
        });

        fastify.get("/inc", async (req, res) => {
            const count: number = await incrementVisits();
            return { message: `Hello visitor #${count}` };
        });

        await fastify.listen(port);
        console.log(`Fastify server listening on port ${port}!`);
    }
    catch (err) {
        fastify.log.error(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

startServer().catch(console.error);
