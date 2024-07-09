import { createParamDecorator } from "routing-controllers";
import { HttpError } from "../common/errors/httpErrors";
import { ESource } from "../interfaces/jokes.interface";
const HttpExecption = require("http-errors");

export function OptionalParam(paramName: string) {
  return createParamDecorator({
    required: false,
    value: (action) => {
      const value = action.request?.params[paramName];
      const param = `{${paramName}}`;
      const result = value === param ? null : value;
      if (result && !Object.values(ESource).includes(result)) {
        throw new HttpExecption(
          406,
          `The source param should be the following values: [${Object.values(
            ESource
          )}] `
        );
      }
      return result;
    },
  });
}
