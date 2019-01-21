import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Column, OneToMany } from "typeorm";
import { TeamOnTournament } from "./TeamOnTournament";
import { RosterOnMatch } from "./RosterOnMatch";

export enum Sides {
    BLUE = "blue",
    RED = "red",
}

@Entity()
export class TeamOnMatch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({default: false})
    winner!: boolean;

    @Column({default: 0})
    kills!: number;

    @Column({default: 0})
    deaths!: number;

    @Column({
        type: "enum",
        enum: Sides,
    })
    side!: Sides;

    @OneToMany(type => RosterOnMatch, roster => roster.teamOnMatch, {
        cascade: true, eager: true,
    })
    roster!: RosterOnMatch[];

    @ManyToOne(type => TeamOnTournament, team => team.matches, {
        eager: true,
    })
    team!: TeamOnTournament;
}