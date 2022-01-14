import { IsAlphanumeric, IsNotEmpty, IsNumberString, IsUrl } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly price: string;
}
