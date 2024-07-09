import { Entity, Column } from "typeorm";
import { BaseModel } from "./Base.model";
import { ESource } from "../interfaces/jokes.interface";

@Entity()
export class JokeModel extends BaseModel {
  @Column()
  value: string;

  @Column("char", { array: true, default: [""] })
  categories?: string[];

  @Column({ default: "" })
  iconUrl?: string;

  @Column({ default: "" })
  url?: string;

  @Column({ default: 200 })
  status?: number;

  @Column({ default: "internal" })
  source: ESource;
}
