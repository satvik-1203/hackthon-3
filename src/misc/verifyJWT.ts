import chalk from "chalk";
import config from "config";
import jwt from "jsonwebtoken";
import readlineSync from "readline-sync";
require("dotenv").config();

export default (): any | void => {
  try {
    const token = readlineSync.question(
      chalk.green("Please enter your token: ")
    );
    const key: any = config.get("JWT-SIGN");
    const payload = jwt.verify(token, key);
    return payload;
  } catch (err) {
    console.log(chalk.red.bold("\ninvalid credentials"));
  }
};
