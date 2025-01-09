import express from "express";
const router = express.Router();

import { getUsers, getUserById, deleteUser } from "../controllers/user";

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router; 