import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authRequest";
import { ErrorType, Message, error } from "../errors/Error";
import { UserOnTournament } from "../models/UserOnTournament";
import { User } from "../models/User";
import { Tournament, TournamentData } from "../models/Tournament";
import { Team } from "../models/Team";
import { TeamOnTournament } from "../models/TeamOnTournament";
import { Roster, Roles } from "../models/Roster";
import { Player } from "../models/Player";
import { Round } from "../models/Round";
import { Match } from "../models/Match";
import { TeamOnMatch, Sides } from "../models/TeamOnMatch";
import { RosterOnMatch } from "../models/RosterOnMatch";

async function getTournament(req: Request, res: Response) {
    try {
        const tournament = await Tournament.findOne(req.params.id, {
            relations: ["teams"],
        });
        return res.send(tournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getAllTournaments(req: Request, res: Response) {
    try {
        const tournaments = await Tournament.find({
            relations: ["teams"],
        });
        return res.send(tournaments);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function newTournament(req: Request, res: Response) {
    const tournamentData: TournamentData = req.body;

    try {
        const tournament = new Tournament();
        tournament.fromData(tournamentData);
        await tournament.save();

        return res.send(tournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function newUserOnTournament(req: Request, res: Response) {
    const userData = (req as AuthRequest).user;
    const tournamentId = req.params.id;

    try {
        const isUserOnTournament = !!(await UserOnTournament.whereUser(userData.id, tournamentId));

        if (!isUserOnTournament) {
            const userPromise = User.findOne(userData.id);
            const tournamentPromise = Tournament.findOne(tournamentId);

            const [user, tournament] = await Promise.all([userPromise, tournamentPromise]);

            if (!tournament) {
                return res.status(400).send(error(ErrorType.Request, Message.TournamentNotFound));
            }

            const newUserOnTournament = new UserOnTournament();
            newUserOnTournament.budget = tournament!.startingBudget;
            newUserOnTournament.user = user!;
            newUserOnTournament.tournament = tournament!;
            await newUserOnTournament.save();

            return res.sendStatus(200);
        }
        
        return res.status(400).send(error(ErrorType.Request, Message.UserIsOnTournament));
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function addTeamOnTournament(req: Request, res: Response) {
    try {
        const teamPromise = Team.findOne(req.params.teamId);
        const tournamentPromise = Tournament.findOne(req.params.tournamentId);

        const [team, tournament] = await Promise.all([teamPromise, tournamentPromise]);

        const teamOnTournament = new TeamOnTournament();
        teamOnTournament.team = team!;
        teamOnTournament.tournament = tournament!;
        await teamOnTournament.save();

        return res.send(teamOnTournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getTeamOnTournament(req: Request, res: Response) {
    try {
        const teamOnTournament = await TeamOnTournament.findOne({
            where: {team_id: req.params.teamId, tournament_id: req.params.tournamentId},
            relations: ["tournament"],
        });

        return res.send(teamOnTournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function addPlayerToTeam(req: Request, res: Response) {
    const players = req.body.players as Array<{
        playerId: number,
        role: Roles,
        value: number,
    }>;

    try {
        const teamOnTournament = await TeamOnTournament.findOne({
            where: {team_id: req.params.teamId, tournament_id: req.params.tournamentId},
            relations: ["tournament"],
        });
        if (!teamOnTournament) {
            return res.status(400).send(error(ErrorType.Request, Message.TeamNotOnTournament));
        }

        //this is bad
        const roster = await Promise.all(players.map(async player => {
            const playerOnRoster = new Roster();
            const newPlayer = await Player.findOne(player.playerId);
            playerOnRoster.player = newPlayer!;
            playerOnRoster.role = player.role;
            playerOnRoster.value = player.value;

            return playerOnRoster.save();
        }));

        teamOnTournament.roster = teamOnTournament.roster? [...teamOnTournament.roster, ...roster]
            : roster; 

        await teamOnTournament.save();
        return res.send(teamOnTournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function addRound(req: Request, res: Response) {
    try {
        const tournament = await Tournament.findOne(req.params.id);

        if (!tournament) {
            return res.status(400).send(error(ErrorType.Request, Message.TournamentNotFound));
        }
    
        const roundData = req.body;
        const round = new Round();
        round.fromData(roundData);
        round.tournament = tournament!;

        await round.save();

        if (!(tournament!.currentRound)) {
            tournament!.currentRound = round;
            await tournament!.save();
        }

        return res.sendStatus(200);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function addMatchToRound(req: Request, res: Response) {
    try {
        const round = await Round.findOne(req.params.roundId);

        if (!round) {
            return res.status(400).send(error(ErrorType.Request, Message.RoundNotFound));
        }

        const match = new Match();
        await match.save();

        const matchData: {
            teams: [number, number], //TeamOnTournament ids.
            sides: [Sides, Sides],
        } = req.body;

        const teamsPromise = matchData.teams.map(teamId => TeamOnTournament.findOne(teamId, {
            relations: ["roster"],
        }));

        const teams = await Promise.all(teamsPromise);
        let rosterPromise: Promise<RosterOnMatch>[] = [];
        
        const teamsOnMatchPromise = teams.map((team, index) => {
            rosterPromise = [...rosterPromise, ...team!.roster.map(player => {
                const rosterOnMatch = new RosterOnMatch();
                rosterOnMatch.player = player;
                rosterOnMatch.match = match;
                return rosterOnMatch.save();
            })]

            const teamOnMatch = new TeamOnMatch();
            const side = matchData.sides[index];

            teamOnMatch.team = team!;
            teamOnMatch.side = side;
            return teamOnMatch.save();
        });
            
        await Promise.all(rosterPromise);
        const teamsOnMatch = await Promise.all(teamsOnMatchPromise);
        match.blueTeam = teamsOnMatch.find(team => team.side === Sides.BLUE)!;
        match.redTeam = teamsOnMatch.find(team => team.side === Sides.RED)!;

        await match.save();

        return res.send(match);
    }
    catch(e) {
        console.log(e);
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    getTournament, getAllTournaments,newTournament, newUserOnTournament,
    addTeamOnTournament, getTeamOnTournament, addPlayerToTeam, addRound,
    addMatchToRound,
};