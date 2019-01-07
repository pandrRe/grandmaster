"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorType;
(function (ErrorType) {
    ErrorType["Internal"] = "INTERNAL_ERROR";
    ErrorType["Auth"] = "AUTH_ERROR";
    ErrorType["Registration"] = "REGISTRATION_ERROR";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var Message;
(function (Message) {
    Message["Credentials"] = "Wrong credentials.";
    Message["UserAlreadyExists"] = "User already exists.";
    Message["SomethingWrong"] = "Something wrong happened on our side...";
})(Message = exports.Message || (exports.Message = {}));
function error(errorType, body) {
    return {
        error: errorType,
        body,
    };
}
exports.error = error;
