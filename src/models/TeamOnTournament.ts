import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Team } from "./Team";
import { Tournament } from "./Tournament";
import { Roster } from "./Roster";
import { TeamOnMatch } from "./TeamOnMatch";

@Entity()
export class TeamOnTournament extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Team, team => team.currentTournaments, {
        eager: true,
    })
    team!: Team;

    @ManyToOne(type => Tournament, tournament => tournament.teams)
    tournament!: Tournament;

    @OneToMany(type => Roster, roster => roster.team)
    roster!: Roster[];

    @OneToMany(type => TeamOnMatch, match => match.team)
    matches!: TeamOnMatch[];
}