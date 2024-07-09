import { OpenAPIParam } from "routing-controllers-openapi";
import { ESource } from "../interfaces/jokes.interface";

export const GetJokesDoc: OpenAPIParam = {
  description: "Return a joke",
  parameters: [
    {
      in: "path",
      name: "source",
      required: false,
      schema: {
        type: "string",
        enum: Object.values(ESource),
      },
      description: "Fuente del chiste (Chuck o Dad)",
    },
  ],
  responses: {
    "200": {
      description: "Éxito",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string", default: "vZMtBCfvT9Gt6ZKk56sIdg" },
              value: {
                type: "string",
                default:
                  "An apple a day keeps the bullies away. If you throw it hard enough.",
              },
              categories: {
                type: ["string"],
                default: [],
              },
              createdAt: {
                type: "string",
                default: "2020-01-05 13:42:23.484083",
              },
              iconUrl: { type: "string", default: "vZMtBCfvT9Gt6ZKk56sIdg" },
              updatedAt: {
                type: "string",
                default: "2020-01-05 13:42:23.484083",
              },
              url: {
                type: "string",
                default:
                  "https://api.chucknorris.io/jokes/JGkooMooSi-g-YvEiZGhBQ",
              },
              status: { type: "number", default: 200 },
              source: {
                type: "string",
                default: ESource.Chuck,
                value_allow: `[${Object.values(ESource)}]`,
              },
            },
          },
        },
      },
    },
  },
};
