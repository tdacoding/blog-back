import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { token } from "../helpers/token.js";
import { ROLES } from "../constants/roles.js";

//register
export const register = async (login, password) => {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  const userToken = token.generate({ id: user.id });
  return { user, token: userToken };
};

//login
export const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) {
    throw new Error("Password is incorrect");
  }
  const userToken = token.generate({ id: user.id });

  return { user, token: userToken };
};

//admin section

export const getUsers = () => {
  return User.find();
};

export const getRoles = () => {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
};

//delete

export const deleteUser = (id) => {
  return User.deleteOne({ _id: id });
};

//edit (role changing)

export const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
};
