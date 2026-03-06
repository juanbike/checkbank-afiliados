"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const affiliateController_1 = require("../controllers/affiliateController");
const router = (0, express_1.Router)();
router.post('/init', affiliateController_1.initAffiliate);
router.post('/activate', affiliateController_1.activateAffiliate);
router.get('/', affiliateController_1.getAffiliates);
exports.default = router;
