import { JsonController, Get } from "routing-controllers";

import { HealthCheckDTO } from "../../dtos";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/")
export class HomeController {
  @Get("healthCheck")
  @OpenAPI({
    description: "This verify the service is running",
    responses: {
      "400": {
        description: "Bad request",
      },
    },
  })
  public healthCheck(): HealthCheckDTO {
    return { status: "healthy" };
  }
}
