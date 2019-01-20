import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Column, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Tournament } from "./Tournament";
import { Roster } from "./Roster";
import { User } from "./User";
import { RoundHistory } from "./RoundHistory";
import { Round } from "./Round";

@Entity()
export class UserOnTournament extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "double precision"})
    budget!: number;

    @Column({type: "double precision", default: 0})
    rosterValue!: number;

    @ManyToOne(type => User, user => user.tournaments)
    user!: User;

    @ManyToOne(type => Tournament, tournament => tournament.users)
    tournament!: Tournament;

    @OneToOne(type => Round)
    @JoinColumn()
    currentRound!: Round;

    @OneToMany(type => RoundHistory, history => history.round)
    history!: RoundHistory[];

    @ManyToMany(type => Roster)
    @JoinTable()
    roster!: Roster[];

    public static async whereUser(userId: number, tournamentId: number) {
        try {
            return await this.createQueryBuilder("user_on_tournament")
            .where("user_on_tournament.user_id = :id AND user_on_tournament.tournament_id = :t_id",
                {id: userId, t_id: tournamentId})
            .getOne();
        }
        catch(e) {
            throw e;
        }
    }
}