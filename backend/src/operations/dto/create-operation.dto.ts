import { IsNotEmpty } from 'class-validator';

export class CreateOperationDto {
  @IsNotEmpty()
  name: string;
}
