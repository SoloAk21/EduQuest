// routes/webhookRoutes.js
import express from "express";
import { clerkWebhooks } from "../controllers/webhookController";

const router = express.Router();

// Clerk webhook endpoint
router.post("/clerk", clerkWebhooks);

export default router;
