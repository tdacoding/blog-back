import express from "express";
import {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} from "../controllers/index.js";
import { mapUser } from "../helpers/mapUser.js";
import { hasRole } from "../middlewares/hasRole.js";
import { ROLES } from "../constants/roles.js";
import { authenticated } from "../middlewares/authenticated.js";

export const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users.map(mapUser) });
});

router.get(
  "/roles",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = getRoles();
    res.send({ data: roles });
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newUser = await updateUser(req.params.id, { role: req.body.roleId });
    res.send({ data: mapUser(newUser) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);
    res.send({ error: null });
  }
);
