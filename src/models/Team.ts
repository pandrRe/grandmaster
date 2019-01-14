import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { TeamOnTournament } from "./TeamOnTournament";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @Column({
        type: "varchar",
        length: 3,
        unique: true,
    })
    tag!: string;

    @Column()
    photoUrl!: string;

    @OneToMany(type => TeamOnTournament, currentTournament => currentTournament.team)
    currentTournaments!: TeamOnTournament[];
}