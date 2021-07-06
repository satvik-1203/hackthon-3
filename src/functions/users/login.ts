import readlineSync from "readline-sync";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import { readFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";
import config from "config";

const login = async (): Promise<void> => {
  try {
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const email = readlineSync.question(
      chalk.blue("Please enter your email: ")
    );

    const user = users.find((user) => user.email === email);
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
    const key: any = config.get("JWT-SIGN");
    const token = jwt.sign({ email: user.email }, key, {
      expiresIn: "1h",
    });
    console.log(chalk.magenta(`The user token is: ${chalk.green(token)}`));
  } catch (err) {
    return console.log(chalk.red.bold(err.message));
  }
};

export default login;
