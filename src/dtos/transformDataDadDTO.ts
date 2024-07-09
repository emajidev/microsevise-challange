import { IChuckData } from "../interfaces/chuck.interface";
import { IDadData } from "../interfaces/dad.interface";
import { ESource } from "../interfaces/jokes.interface";

export class TransformDataDadJokeDto {
  id: string;
  value: string;
  categories?: string[];
  createdAt?: string;
  iconUrl?: string;
  updatedAt?: string;
  url?: string;
  status?: number;
  source: ESource;

  constructor(data: IDadData) {
    this.id = data.id;
    this.value = data.joke;
    this.status = data.status;
    this.createdAt = "";
    this.iconUrl = "";
    this.updatedAt = "";
    this.url = "";
    this.source = ESource.Dad;
  }
}
