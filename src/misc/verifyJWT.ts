import jwt from "jsonwebtoken";
import readlineSync from "readline-sync";
require("dotenv").config();

export default (): any | void => {
  try {
    const token = readlineSync.question("Please enter your token: ");
    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("NO signature");
    const payload = jwt.verify(token, signature);
    return payload;
  } catch (err) {
    console.log("invalid credentials");
  }
};
