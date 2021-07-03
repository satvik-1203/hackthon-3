import { IUser } from "../../interface";
import { readDB, signUpInputs, writeDB } from "../../misc";
import bcrypt from "bcrypt";
import chalk from "chalk";
require("dotenv").config();

const createAccount = async (): Promise<void> => {
  try {
    let { name, email, password, confirmPassword } = signUpInputs();
    if (password !== confirmPassword) {
      console.log(chalk.red.bold("\nPasswords don't match!!, Try again\n"));
      return createAccount();
    }
    console.log();

    const saltRound = process.env["HashLength"];
    if (!saltRound) return console.log("No Hash Length");
    const salt = await bcrypt.genSalt(+saltRound);
    password = await bcrypt.hash(password, salt);

    const userInfo: IUser = {
      name,
      email,
      password,
    };

    const Users = await readDB();

    if (!Users) return;

    const exist = Users.find((user) => user.email === email);
    if (exist) {
      console.log(chalk.red.bold("Email already exist, Please try again...\n"));
      return createAccount();
    }
    Users.push(userInfo);
    await writeDB(Users);
    console.log(chalk.magenta("User account created in the database "));
  } catch (err) {
    console.error(chalk.red.bold(err));
  }
};

export default createAccount;
