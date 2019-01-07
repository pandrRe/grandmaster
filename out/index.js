"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const dbconfig_1 = __importDefault(require("./dbconfig"));
const jwt_config_1 = require("./jwt_config");
const Route = __importStar(require("./routes"));
typeorm_1.createConnection(dbconfig_1.default).then((connection) => __awaiter(this, void 0, void 0, function* () {
    jwt_config_1.JWTConfig();
    const app = express_1.default();
    const port = 3000;
    app.use(express_1.default.json());
    app.use("/", Route.Base);
    app.use("/user", Route.User);
    app.listen(port, () => console.log(`Listening on port ${port}.`));
}));
