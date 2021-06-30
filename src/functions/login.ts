import { IUser } from "../interface";
import readlineSync from "readline-sync";
import { dataBase } from "../BASEURl";
import { readFile } from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const login = async (): Promise<void> => {
  const Users: IUser[] = JSON.parse(await readFile(dataBase, "utf-8"));
  const email: string = readlineSync.question("Please enter your email: ");

  const user = Users.find((user) => user.email === email);
  const password: string = readlineSync.question(
    "Please enter your password: "
  );

  if (!user) {
    console.log("No User found in the db, Please try again: ");
    return login();
  }

  const verify = await bcrypt.compare(password, user.password);
  if (!verify) return console.log("Invalid credentials");
  const jwtSign = process.env["JWT-SIGN"];
  if (!jwtSign) return console.log("No jwt sign available");
  const token = jwt.sign({ email: user.email }, jwtSign, { expiresIn: "1h" });
  console.log(`The user token is: ${token}`);
};

export default login;
