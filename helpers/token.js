import jsonwebtoken from "jsonwebtoken";

const sign = "testtest";

export const token = {
  generate(data) {
    return jsonwebtoken.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jsonwebtoken.verify(token, sign);
  },
};
