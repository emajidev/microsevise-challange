import { Expose, Transform } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class JokeDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  value: string;

  @IsOptional()
  @IsArray()
  @Expose()
  categories?: string[];

  @IsOptional()
  @IsString()
  @Expose()
  createdAt?: string;

  @IsOptional()
  @IsString()
  @Expose()
  iconUrl?: string;

  @IsOptional()
  @IsString()
  @Expose()
  updatedAt?: string;

  @IsOptional()
  @IsString()
  @Expose()
  url?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  @Transform(({ value }) => value || undefined) // Transformar undefined si no existe
  status?: number;
}
