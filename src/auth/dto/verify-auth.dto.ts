import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
