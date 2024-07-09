import { Container } from "typedi";
import { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import {
  createExpressServer,
  getMetadataArgsStorage,
  useContainer,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import { HomeController } from "./controllers/v1/Home.controller";
import { JokeController } from "./controllers/v1/Jokes.controller";
import config from "./config";
import clientElastic from "./connections/elasticsearch.client";
import { ElasticRepository } from "./repositories/elasticsearch.repository";
import { Client } from "@elastic/elasticsearch";

useContainer(Container);

const app: Express = createExpressServer({
  controllers: [HomeController, JokeController],
  routePrefix: "/api/v1",
  defaultErrorHandler: false,
});

// Registrar el cliente de ElasticSearch en el contenedor de dependencias
Container.set(Client, clientElastic);
// Inyectar el repository de ElasticSearch en el contenedor de dependencias
Container.set(ElasticRepository, new ElasticRepository(clientElastic));

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {
    controllers: [HomeController, JokeController],
    routePrefix: "/api/v1",
  },
  {
    components: {
      securitySchemes: {
        basicAuth: {
          scheme: "basic",
          type: "http",
        },
      },
    },
    info: {
      description: "Generated with `routing-controllers-openapi`",
      title: "ms-challenger",
      version: "1.0.0",
    },
  }
);

app.use((error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error["status"])
    .json({ status: error.status, message: error.message });
});
// Agrega Swagger UI para documentación
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

// Renderiza la especificación en la raíz:
app.get("/", (_req, res) => {
  res.json(spec);
});

// Inicia el servidor en el puerto 3001
app.listen(config.app.port, () => {
  console.log(
    `Express server is running on port ${config.app.port}. Open doc http://localhost:${config.app.port}/docs/`
  );
});
