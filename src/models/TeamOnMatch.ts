import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Column } from "typeorm";
import { Match } from "./Match";
import { TeamOnTournament } from "./TeamOnTournament";

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

    @ManyToOne(type => TeamOnTournament, team => team.matches)
    team!: TeamOnTournament;
}