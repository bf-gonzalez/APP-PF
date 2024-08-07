import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tipo } from '../enum/type.enum';
import { Users } from "src/users/users.entity";

@Entity()

export class Membership{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    /**
     * El tipo de usuario. Debe ser uno de los siguientes: annual, monthly, creator.
     * @example annual
     */
    @Column({
        type: 'enum',
        enum: Tipo,
    })
    type: Tipo;

     /**
     * Es de tipo decimal, precision de 10 y una escala de 2, no puede ser null
     * @example 25.50
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    /**
     * Fecha de creación del registro.
     * @example 2024-07-25T12:34:56.789Z
     */
    @CreateDateColumn()
    created_at: Date;

    /**
     * Fecha del pago.
     * @example 2024-07-25
     */
    @Column({
        type: 'date',
        nullable: false,
    })
    payment_date: Date;

    @ManyToOne(() => Users, (user) => user.memberships, { eager: true, nullable: false })
    user: Users;
}