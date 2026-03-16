"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Todas las rutas requieren autenticación y rol de administrador
router.use(authMiddleware_1.authenticateToken);
router.use((0, roleMiddleware_1.authorizeRoles)('admin'));
router.get('/stats', paymentController_1.getPaymentStats);
router.get('/', paymentController_1.getAllPayments);
exports.default = router;
