import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column, OneToOne, JoinColumn } from "typeorm";
import { Round } from "./Round";
import { RosterOnMatch } from "./RosterOnMatch";
import { TeamOnMatch } from "./TeamOnMatch";

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    duration!: string;

    @OneToOne(type => TeamOnMatch)
    @JoinColumn()
    blueTeam!: TeamOnMatch;

    @OneToOne(type => TeamOnMatch)
    @JoinColumn()
    redTeam!: TeamOnMatch;

    @ManyToOne(type => Round, round => round.matches)
    round!: Round;

    @OneToMany(type => RosterOnMatch, player => player.match)
    players!: RosterOnMatch[];
}