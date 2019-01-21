export enum ErrorType {
    Internal = "INTERNAL_ERROR",
    Auth = "AUTH_ERROR",
    Registration = "REGISTRATION_ERROR",
    Request = "REQUEST_ERROR",
}

export enum Message {
    NotLoggedIn = "You are not logged in.",
    Unauthorized = "You don't have permission to access this endpoint.",
    Credentials = "Wrong credentials.",
    UserAlreadyExists = "User already exists.",
    SomethingWrong = "Something wrong happened on our side...",
    UserIsOnTournament = "The user is already participating in the tournament.",
    TournamentNotFound = "Specified tournament was not found.",
    TeamNotOnTournament = "The specified team on tournament was not found.",
    MatchNotFound = "Match not found.",
    RoundNotFound = "Round not found.",
    PlayerNotFound = "Player not found.",
    PerformanceParameterNotFound = "Performance parameter not found.",
}

export function error(errorType: ErrorType, body: Message | object | Array<object>) {
    return {
        error: errorType,
        body,
    };
}