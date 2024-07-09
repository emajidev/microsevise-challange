import { Entity, Column } from "typeorm";
import { BaseModel } from "./Base.model";
import { ESource } from "../interfaces/jokes.interface";

@Entity()
export class JokeModel extends BaseModel {
  @Column()
  value: string;

  @Column()
  categories?: string[];

  @Column()
  iconUrl?: string;

  @Column()
  url?: string;

  @Column()
  status?: number;

  @Column()
  source: ESource;
}
