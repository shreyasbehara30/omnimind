"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agentController_1 = require("../controllers/agentController");
const router = (0, express_1.Router)();
router.post('/chat', agentController_1.chat);
router.get('/history/:sessionId', agentController_1.getHistory);
router.get('/products', agentController_1.getProducts);
exports.default = router;
