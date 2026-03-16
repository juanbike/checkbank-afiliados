"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
function fix() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // 1. Get an affiliate ID
        const affRes = yield db_1.default.query('SELECT id FROM affiliates LIMIT 1');
        const affId = (_a = affRes.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
        if (affId) {
            console.log(`Linking cmartinez to affiliate ${affId}`);
            yield db_1.default.query("UPDATE auth_users SET affiliate_id = $1 WHERE username = 'cmartinez'", [affId]);
            console.log("✅ Done.");
        }
        else {
            console.log("No affiliates found to link.");
        }
        process.exit(0);
    });
}
fix();
