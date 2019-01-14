import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Team } from "./Team";
import { Tournament } from "./Tournament";
import { Roster } from "./Roster";
import { Match } from "./Match";

@Entity()
export class TeamOnTournament extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(type => Roster, roster => roster.team)
    roster!: Roster[];

    @OneToMany(type => Match, match => match.blueTeam)
    bluesideGames!: Match[];

    @OneToMany(type => Match, match => match.redTeam)
    redsideGames!: Match[];

    @ManyToOne(type => Team, team => team.currentTournaments)
    team!: Team;

    @ManyToOne(type => Tournament, tournament => tournament.teams)
    tournament!: Tournament;
}