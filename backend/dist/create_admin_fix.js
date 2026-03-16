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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function createAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const username = 'admin@consulbank.com.ve';
        const password = '123456';
        const hash = yield bcryptjs_1.default.hash(password, 10);
        // Check if role admin exists
        const roleRes = yield db_1.default.query("SELECT id FROM roles WHERE slug = 'admin'");
        const adminRoleId = (_a = roleRes.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
        if (!adminRoleId) {
            console.error("No existe el rol admin. Por favor ejecuta el script de roles primero.");
            process.exit(1);
        }
        yield db_1.default.query(`
        INSERT INTO auth_users (username, password, full_name, role_id, branch)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO UPDATE 
        SET password = EXCLUDED.password, role_id = EXCLUDED.role_id
    `, [username, hash, 'Administrador Sistema', adminRoleId, 'Principal']);
        console.log(`✅ Usuario ${username} creado/actualizado con éxito.`);
        process.exit(0);
    });
}
createAdmin();
