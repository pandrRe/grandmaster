export enum ErrorType {
    Internal = "INTERNAL_ERROR",
    Auth = "AUTH_ERROR",
    Registration = "REGISTRATION_ERROR",
}

export enum Message {
    Credentials = "Wrong credentials.",
    UserAlreadyExists = "User already exists.",
    SomethingWrong = "Something wrong happened on our side...",
}

export function error(errorType: ErrorType, body: Message | object | Array<object>) {
    return {
        error: errorType,
        body,
    };
}