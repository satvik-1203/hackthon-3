import { IUser } from "../../interface";
import { signUpInputs } from "../../misc";
import bcrypt from "bcrypt";
import chalk from "chalk";
require("dotenv").config();
import { readFile, writeFile } from "fs/promises";
import { dataBase } from "../../BASEURL";

const createAccount = async (): Promise<void> => {
  try {
    let { name, email, password, confirmPassword } = signUpInputs();
    if (password !== confirmPassword) {
      console.log(chalk.red.bold("\nPasswords don't match!!, Try again\n"));
      return createAccount();
    }
    console.log();

    const saltRound = 10;
    const salt = await bcrypt.genSalt(+saltRound);
    password = await bcrypt.hash(password, salt);

    const userInfo: IUser = {
      name,
      email,
      password,
    };
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);

    const exist = users.find((user) => user.email === email);
    if (exist) {
      console.log(chalk.red.bold("Email already exist, Please try again...\n"));
      return createAccount();
    }
    users.push(userInfo);
    await writeFile(dataBase, JSON.stringify(data));
    console.log(chalk.magenta("User account created in the database "));
  } catch (err) {
    console.error(chalk.red.bold(err));
  }
};

export default createAccount;
