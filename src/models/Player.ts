import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Roster } from "./Roster";

@Entity()
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @Column()
    realName!: string;

    @Column()
    age!: number;

    @Column()
    photoUrl!: string;

    @OneToMany(type => Roster, roster => roster.player)
    participations!: Roster[];
}