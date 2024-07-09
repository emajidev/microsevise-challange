import { OpenAPIParam } from "routing-controllers-openapi";

export const calculateLCM: OpenAPIParam = {
  summary: "Calculate the Least Common Multiple (LCM) of an array of numbers",
  parameters: [
    {
      name: "numbers",
      in: "query",
      description: "List integer numbers",
      required: true,
      schema: {
        type: "array",
        items: { type: "string" },
      },
    },
  ],

  /* requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            numbers: {
              type: "array",
              items: {
                type: "integer",
              },
            },
          },
          required: ["numbers"],
        },
      },
    },
  }, */
  responses: {
    "200": {
      description: "LCM calculated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              lcm: { type: "integer" },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid input",
    },
  },
};

export const incrementNumber: OpenAPIParam = {
  summary: "Increment a number by 1",
  parameters: [
    {
      name: "number",
      in: "query",
      description: "The number to be incremented",
      required: true,
      schema: {
        type: "integer",
      },
    },
  ],
  responses: {
    "200": {
      description: "Number incremented successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "integer" },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid input",
    },
  },
};
