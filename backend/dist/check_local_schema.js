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
function checkSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('--- Checking Local Database Schema ---');
        const tables = ['auth_users', 'affiliates', 'activity_logs'];
        for (const table of tables) {
            const res = yield db_1.default.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = '${table}' 
            ORDER BY ordinal_position
        `);
            console.log(`\nTable: ${table}`);
            res.rows.forEach(col => {
                console.log(`- ${col.column_name}: ${col.data_type}`);
            });
        }
        process.exit(0);
    });
}
checkSchema();
