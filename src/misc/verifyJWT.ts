import jwt from "jsonwebtoken";
require("dotenv").config();

export default (token: string): any | void => {
  try {
    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("NO signature");
    const payload = jwt.verify(token, signature);
    return payload;
  } catch (err) {
    console.log("invalid credentials");
  }
};
