import readlineSync from "readline-sync";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readDB } from "../../misc";
import chalk from "chalk";
require("dotenv").config();

const login = async (): Promise<void> => {
  try {
    const Users = await readDB();
    if (!Users) return;
    const email = readlineSync.question(
      chalk.blue("Please enter your email: ")
    );

    const user = Users.find((user) => user.email === email);
    const password = readlineSync.question(
      chalk.blue("Please enter your password: "),
      {
        hideEchoBack: true,
      }
    );
    console.log();
    if (!user) return console.log(chalk.red.bold("Invalid credentials"));

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) return console.log(chalk.red.bold("Invalid credentials"));
    const jwtSign = process.env["JWT-SIGN"];
    if (!jwtSign) return console.log(chalk.red.bold("No jwt sign available"));
    const token = jwt.sign({ email: user.email }, jwtSign, {
      expiresIn: "1h",
    });
    console.log(chalk.magenta(`The user token is: ${chalk.green(token)}`));
  } catch (err) {
    return console.log(chalk.red.bold(err.message));
  }
};

export default login;
