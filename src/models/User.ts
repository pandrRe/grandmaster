import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    login!: string;

    @Column({select: false})
    password!: string;

    @Column()
    profile!: number;
}