// src/repositories/UserRepository.ts
import { DataSource, Repository } from "typeorm";
import { JokeModel } from "../models/Joke.model";
import { Service } from "typedi";
import { AppDataSource } from "../app";

export const jokeRepository = AppDataSource.getRepository(JokeModel);
