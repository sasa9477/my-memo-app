import express, { Request, Response } from "express";
import next from "next";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare()
    .then(() => {
        const server = express();

        const swaggerDocument = YAML.load('./src/openapi.yaml');

        server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    });