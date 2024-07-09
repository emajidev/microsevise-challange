import { Inject, Service } from "typedi";
import { BaseService } from "../common/services/Base.service";
import { ESource, IJoke } from "../interfaces/jokes.interface";
import { ChuckApiService } from "./Chuck.service";
import { DadApiService } from "./Dad.service";
import { TransformDataChuckJokeDto } from "../dtos/transformDataChukDTO";
import { TransformDataDadJokeDto } from "../dtos/transformDataDadDTO";
import { HttpError } from "../common/errors/httpErrors";

@Service()
export class JokesService extends BaseService {
  //@OrmRepository()

  constructor(
    private readonly chuckService: ChuckApiService,
    private readonly DadService: DadApiService
  ) {
    super();
  }

  async getJoke(source: any | null): Promise<IJoke> {
    return await this.actionBySource(source);
  }

  async create(joke: string) {
    throw new Error("Method not implemented.");
  }

  async update(joke: string) {
    throw new Error("Method not implemented.");
  }

  async delete(joke: string) {
    throw new Error("Method not implemented.");
  }

  // private methods
  private async actionBySource(source) {
    if (!source) {
      source = this.getRandomSourceValue();
    }
    const actions = {
      [ESource.Chuck]: await this.callDataChuck(),
      [ESource.Dad]: await this.callDataDad(),
    };

    const data = actions[source];
    return data;

    // Random joke
  }

  private async callDataChuck() {
    const data = await this.chuckService.getData();
    return new TransformDataChuckJokeDto(data);
  }

  private async callDataDad() {
    const data = await this.DadService.getData();
    return new TransformDataDadJokeDto(data);
  }

  private getRandomSourceValue(): ESource {
    const randomIndex = Math.floor(Math.random() * 2); // Genera 0 o 1 aleatoriamente
    return randomIndex === 0 ? ESource.Chuck : ESource.Dad;
  }
}
