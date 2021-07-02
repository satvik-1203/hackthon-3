import { IUser } from "../../interface";
import { readDB, signUpInputs, writeDB } from "../../misc";
import { writeFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import bcrypt from "bcrypt";
require("dotenv").config();

const createAccount = async (): Promise<void> => {
  try {
    let { name, email, password, confirmPassword } = signUpInputs();
    if (password !== confirmPassword) {
      console.log("\nPasswords don't match!!\n");
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
      todo: [],
    };

    const Users = await readDB();

    if (!Users) return;

    const exist = Users.find((user) => user.email === email);
    if (exist) {
      console.log("Email already exist, Please try again...\n");
      return createAccount();
    }
    Users.push(userInfo);
    await writeDB(Users);
    console.log("User account created in the database ");
  } catch (err) {
    console.error(err);
  }
};

export default createAccount;
