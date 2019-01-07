import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Min, Max, Length, validate, ValidationError } from "class-validator";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    @Length(5, 15)
    login!: string;

    @Column({select: false})
    @Length(8, 20)
    password!: string;

    @Column()
    profile!: number;

    public async validate() : Promise<[boolean, ValidationError[] | null]> {
        const errors = await validate(this, { validationError: { target: false } });
        if (errors.length > 0) {
            return [true, errors];
        }

        return [false, null];
    }
}