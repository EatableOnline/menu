import { IsNotEmpty, IsNumberString, IsString, IsUrl } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly price: string;
}
