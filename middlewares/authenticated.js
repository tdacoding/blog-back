import { token } from "../helpers/token.js";
import { User } from "../models/index.js";

export const authenticated = async (req, res, next) => {
  const tokenData = token.verify(req.cookies.token);
  const user = await User.findOne({ _id: tokenData.id });
  if (!user) {
    res.send({ error: "Authenticate user not found" });
    return;
  }
  req.user = user;
  next();
};
