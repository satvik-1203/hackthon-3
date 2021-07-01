import jwt from "jsonwebtoken";
require("dotenv").config();

export default (token: string): any => {
  try {
    const payload = jwt.verify(token, "");
  } catch (err) {
    console.log("Invalid token");
  }
};
