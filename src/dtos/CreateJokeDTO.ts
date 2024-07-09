import { IChuckData } from "../interfaces/chuck.interface";
import { IDadData } from "../interfaces/dad.interface";
import { ESource, IJoke } from "../interfaces/jokes.interface";

export class CreateJokeDto {
  id: string;
  value: string;
  categories?: string[];
  createdAt?: string;
  iconUrl?: string;
  updatedAt?: string;
  url?: string;
  status?: number;
  source: ESource;
}
