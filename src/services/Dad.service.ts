import { AxiosRequestConfig } from "axios";
import { HttpError } from "../common/errors/httpErrors";
import { ExternalApiService } from "../common/services/External-api.service";
import config from "../config";
import { IDadData } from "../interfaces/dad.interface";
import { Service } from "typedi";

@Service()
export class DadApiService {
  private externalApiService: ExternalApiService;

  constructor() {
    this.externalApiService = new ExternalApiService.Builder(
      config.external_api.dad
    )
      .setTimeout(5000)
      .build();
  }

  async getData(): Promise<IDadData> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json",
        },
      };
      return await this.externalApiService.get("/", config);
    } catch (error) {
      throw new HttpError(500, error);
    }
  }
}
