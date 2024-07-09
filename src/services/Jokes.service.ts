import { Service } from "typedi";
import { BaseService } from "../common/services/Base.service";
import { ESource, IJoke } from "../interfaces/jokes.interface";
import { ChuckApiService } from "./Chuck.service";
import { DadApiService } from "./Dad.service";
import { TransformDataChuckJokeDto } from "../dtos/transformDataChukDTO";
import { TransformDataDadJokeDto } from "../dtos/transformDataDadDTO";
import { AppDataSource } from "../app";
import { JokeModel } from "../models/Joke.model";
import { Repository } from "typeorm";
import { UpdateJokeDTO } from "../dtos/UpdateJokeDTO";
const HttpExecption = require("http-errors");

@Service()
export class JokesService extends BaseService {
  private repositoryJoke: Repository<JokeModel>;

  constructor(
    private readonly chuckService: ChuckApiService,
    private readonly DadService: DadApiService
  ) {
    super();
    this.repositoryJoke = AppDataSource.getRepository(JokeModel);
  }

  async getJoke(source: any | null): Promise<IJoke> {
    return await this.actionBySource(source);
  }

  async create(joke: string) {
    await this.validateExistJoke(joke);
    return await this.repositoryJoke.save({
      value: joke,
    });
  }

  async update(id: string, body: UpdateJokeDTO) {
    if (body?.value) {
      await this.validateExistJoke(body?.value);
    }
    return await this.repositoryJoke.update({ id }, body);
  }

  async delete(id: string) {
    try {
      await this.repositoryJoke.delete({ id });
      const findJoke = await this.repositoryJoke.findOneBy({ id });
      if (!findJoke) {
        return { message: `The joke was delete successfully` };
      }
    } catch (error) {
      throw new HttpExecption(500, error);
    }
  }

  // private methods
  private async validateExistJoke(joke: string) {
    const findJoke = await this.repositoryJoke.findOneBy({ value: joke });
    if (findJoke) {
      throw new HttpExecption(403, `This Jocke exits`);
    }
  }

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
