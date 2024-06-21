import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
// import { Role } from 'src/enums/role.enum';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  // @IsOptional()
  // @IsEnum(Role)
  // role: number;
}
