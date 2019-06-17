import { IsString, IsInt, IsNumber, IsEnum, IsBoolean } from 'class-validator';

export class CreateOrderDto {
  @IsString() readonly trader: string;
  @IsString() readonly ticker: string;
  @IsString() readonly side: string;
  @IsNumber() readonly price: number;
  @IsInt() readonly shares: number;
  @IsInt() readonly timestamp: number;
  @IsBoolean() readonly isExecuted: boolean;
}
