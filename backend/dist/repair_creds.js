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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("./config/db"));
function repair() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const password = '123456';
            const hash = yield bcryptjs_1.default.hash(password, 10);
            console.log(`Hash generado: ${hash}`);
            const users = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez'];
            for (const user of users) {
                yield db_1.default.query('UPDATE auth_users SET password = $1 WHERE username = $2', [hash, user]);
                console.log(`✅ ${user} actualizado.`);
            }
            yield db_1.default.query("UPDATE auth_users SET password = $1 WHERE username LIKE 'user_%@test.com'", [hash]);
            console.log("✅ Usuarios de prueba actualizados.");
            process.exit(0);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
repair();
