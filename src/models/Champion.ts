import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { RosterOnMatch } from "./RosterOnMatch";

@Entity()
export class Champion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @Column()
    photoUrl!: string;

    @OneToMany(type => RosterOnMatch, match => match.champion)
    matches!: RosterOnMatch[];
}