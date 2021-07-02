import jwt from "jsonwebtoken";
require("dotenv").config();

export default (token: string): any | void => {
  try {
    const payload = jwt.verify(token, "");
    return payload;
  } catch (err) {
    console.log("invalid credentials");
  }
};
