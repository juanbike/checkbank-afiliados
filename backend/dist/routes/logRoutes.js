"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const logController_1 = require("../controllers/logController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Solo el admin puede ver los historiales
router.get('/', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)('admin'), logController_1.getActivityLogs);
router.get('/errors', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)('admin'), logController_1.getErrorLogs);
router.delete('/errors', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)('admin'), logController_1.clearErrorLogs);
router.post('/', (req, res) => {
    const { error, context, metadata } = req.body;
    (0, logger_1.logError)({
        message: error,
        stack: metadata === null || metadata === void 0 ? void 0 : metadata.stack
    }, `FRONTEND: ${context || 'General'}`);
    res.status(200).json({ status: 'logged' });
});
exports.default = router;
