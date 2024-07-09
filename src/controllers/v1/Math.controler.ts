import { JsonController, Get, QueryParam } from "routing-controllers";

import { OpenAPI } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";
import { MathService } from "../../services/math.service";
import { calculateLCM, incrementNumber } from "../../doc/endpoints-math";

@Service()
@JsonController("/math")
export class MathController {
  constructor(@Inject() private mathService: MathService) {}

  @Get("/lcm")
  @OpenAPI(calculateLCM)
  calculateLCM(@QueryParam("numbers") numbers: string[]): { lcm: number } {
    const lcmResult = this.mathService.lcmOfArray(numbers);
    return { lcm: lcmResult };
  }

  @Get("/increment")
  @OpenAPI(incrementNumber)
  public increment(@QueryParam("numbers") number: string): number {
    return this.mathService.incrementNumber(number);
  }
}
