// src/repositories/UserRepository.ts
import { DataSource, Repository } from "typeorm";
import { JokeModel } from "../models/Joke.model";
import { Service } from "typedi";

@Service()
export class JokeRepository extends Repository<JokeModel> {
  constructor(dataSource: DataSource) {
    super(JokeModel, dataSource.createEntityManager());
  }
}
