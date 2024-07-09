import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateJokeDTO {
  @IsString()
  @Expose()
  @IsOptional()
  value: string;

  @IsString()
  @IsOptional()
  @Expose()
  iconUrl?: string;
  
  @IsString()
  @IsOptional()
  @Expose()
  url?: string;
}
