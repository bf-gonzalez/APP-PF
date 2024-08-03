import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MembershipType } from 'src/enum/membership-type.enum';

/**
 * Email:
 * Debe ser de tipo string y un formato de correo válido
 * @example 'comicraft2024gmail.com'
 */
export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  /**
   * type:
   * Son 3 tipos de membresías:
   * Membresía mensual = 'monthly_member',
   * Membresía Anual = 'annual_member',
   * Membresía para Creadores = 'creator',
   * @example 'monthly_member'
   */
  @IsNotEmpty()
  @IsEnum(MembershipType)
  type: MembershipType;

  /**
   * price:
   * Debe se de tipo númerico
   * @example '300.00'
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * created_at:
   * Fecha de creación de la membresía
   * Es de tipo Date
   * @example '1995-07-27'
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  /**
   * created_at:
   * Fecha de pago de la membresía
   * Es de tipo Date
   * @example '1995-07-27'
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  payment_date: Date;
}
