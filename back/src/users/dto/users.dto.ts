import { PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber, IsNotEmpty, MinLength, MaxLength, Matches, IsEmail, IsStrongPassword, Validate, IsDate } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { MembershipType } from 'src/enum/membership-type.enum';
import { Role } from 'src/enum/role.enum';
import { Type } from 'class-transformer';


export class CreateUserDto {
  
   /**
   * Debe ser un string de entre 3 y 80 caracteres
   * @example 'TestUser'
   */
   @IsNotEmpty()
   @IsString()
   @MinLength(3)
   @MaxLength(80)
   @Matches(/^[a-zA-Z]+$/, {
       message: 'El nombre no puede contener numeros.'
     })
   name: string;
  
  /**
  * Debe ser un string con formato de email valido
  * @example 'user01@example.com'
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;
  

  /**
  * Debe ser un numero
  * @example '1995-07-27'
  */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  /**
  * Debe contener entre 8 y 15 caracteres, e incluir al menos 1 letra minuscula, una mayuscula, un numero y un caracter especial
  * @example 'Test001$'
  */
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  /**
  * Debe coinsidir con el password
  * @example 'Test001$'
  */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
  * Debe coinsidir con el password
  * @example 'calle falsa 123'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
  * Debe ser un numero
  * @example '123456789'
  */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsEnum(MembershipType)
  membershipType?: MembershipType;
}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']){
  
}