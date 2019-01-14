import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Length, validate, ValidationError } from "class-validator";
import { UserOnTournament } from "./UserOnTournament";

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

    @OneToMany(type => UserOnTournament, tournament => tournament.user)
    tournaments!: UserOnTournament[];

    public async validate() : Promise<[boolean, ValidationError[] | null]> {
        const errors = await validate(this, { validationError: { target: false } });
        if (errors.length > 0) {
            return [true, errors];
        }

        return [false, null];
    }
}