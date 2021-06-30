import readline from "readline-sync";
import { IUser } from "../interface";
import { readDB } from "../misc";
import { writeFile } from "fs/promises";
import { dataBase } from "../BASEURl";
import bcrypt from "bcrypt";
require("dotenv").config();

const createAccount = async (): Promise<void> => {
  try {
    const labels = ["Name", "Email", "Password"];
    const userDetails: string[] = [];
    while (userDetails.length < labels.length) {
      const answer = readline
        .question(`Enter your ${labels[userDetails.length]}: `)
        .trim();
      if (answer) userDetails.push(answer);
    }
    let [name, email, password] = userDetails;
    const saltRound = process.env["HashLength"];
    if (!saltRound) return console.log("No Hash Length");
    password = await bcrypt.hash(password, saltRound);

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
      console.log("Email already exist, Please try again...");
      createAccount();
      return;
    }
    Users.push(userInfo);
    await writeFile(dataBase, JSON.stringify(Users));
    console.log("User account created in the database");
  } catch (err) {
    console.error(err);
  }
};

export default createAccount;
