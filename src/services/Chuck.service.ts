import { HttpError } from "../common/errors/httpErrors";
import { ExternalApiService } from "../common/services/External-api.service";
import config from "../config";
import { IChuckData } from "../interfaces/chuck.interface";
import { Service } from "typedi";

@Service()
export class ChuckApiService {
  constructor(private readonly externalApiService: ExternalApiService) {
    this.externalApiService = new ExternalApiService.Builder(
      config.external_api.chuck
    )
      .setTimeout(5000)
      .build();
  }

  async getData(): Promise<IChuckData> {
    try {
      return await this.externalApiService.get("/");
    } catch (error) {
      throw new HttpError(500, error);
    }
  }
}
