import {
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  toPromise(): Promise<any> {
    return Promise.resolve(this);
  }
}
