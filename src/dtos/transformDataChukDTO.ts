import { IChuckData } from "../interfaces/chuck.interface";
import { IDadData } from "../interfaces/dad.interface";
import { ESource } from "../interfaces/jokes.interface";

export class TransformDataChuckJokeDto {
  id: string;
  value: string;
  categories?: string[];
  createdAt?: string;
  iconUrl?: string;
  updatedAt?: string;
  url?: string;
  status?: number;
  source: ESource;

  constructor(data: IChuckData) {
    this.id = data?.id ?? "";
    this.value = data?.value ?? "";
    this.categories = data?.categories ?? [""];
    this.createdAt = data?.created_at ?? "";
    this.iconUrl = data?.icon_url ?? "";
    this.updatedAt = data?.updated_at ?? "";
    this.url = data?.url ?? "";
    this.source = ESource.Chuck;
  }
}
