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
function unifyLocalSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('--- Unifying Local Schema to Match Production ---');
        try {
            // 1. Convert Enums to Varchar in affiliates table
            console.log('Converting enums to varchar in affiliates...');
            yield db_1.default.query(`
            -- Temp columns
            ALTER TABLE affiliates ADD COLUMN client_type_new VARCHAR(50);
            ALTER TABLE affiliates ADD COLUMN plan_new VARCHAR(100);
            ALTER TABLE affiliates ADD COLUMN payment_period_new VARCHAR(50);
            ALTER TABLE affiliates ADD COLUMN status_new VARCHAR(50);

            -- Copy data
            UPDATE affiliates SET 
                client_type_new = client_type::text,
                plan_new = plan::text,
                payment_period_new = payment_period::text,
                status_new = status::text;

            -- Drop old and rename
            ALTER TABLE affiliates DROP COLUMN client_type;
            ALTER TABLE affiliates DROP COLUMN plan;
            ALTER TABLE affiliates DROP COLUMN payment_period;
            ALTER TABLE affiliates DROP COLUMN status;

            ALTER TABLE affiliates RENAME COLUMN client_type_new TO client_type;
            ALTER TABLE affiliates RENAME COLUMN plan_new TO plan;
            ALTER TABLE affiliates RENAME COLUMN payment_period_new TO payment_period;
            ALTER TABLE affiliates RENAME COLUMN status_new TO status;
        `);
            // 2. Ensure activity_logs structure matches exactly
            console.log('Updating activity_logs structure...');
            // Note: activity_logs might not exist or have different structure
            yield db_1.default.query(`
            DROP TABLE IF EXISTS activity_logs CASCADE;
            CREATE TABLE activity_logs (
                id BIGSERIAL PRIMARY KEY,
                user_id UUID REFERENCES auth_users(id),
                username VARCHAR(100),
                action VARCHAR(50) NOT NULL,
                entity_type VARCHAR(50),
                entity_id VARCHAR(100),
                details JSONB,
                ip_address VARCHAR(45),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
            console.log('✅ Local schema unified successfully!');
        }
        catch (error) {
            console.error('❌ Error unifying local schema:', error);
        }
        finally {
            process.exit(0);
        }
    });
}
unifyLocalSchema();
