import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import { readDB } from "../../misc";
import { IUser } from "../../interface";
require("dotenv").config();

export default async (token?: string): Promise<void | [IUser[], number]> => {
  try {
    if (!token) {
      token = readlineSync.question("Please enter your token: ");
    }
    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("No signature");
    const payload: any = jwt.verify(token, signature);
    const Users = await readDB();
    if (!Users) return console.log("No users");
    const userIndex = Users.findIndex((obj) => obj.email === payload.email);

    if (!userIndex) return console.log("No user found in the db");
    console.log("\n");
    Users[userIndex].todo.forEach((task, index) =>
      console.log(`${index + 1}) ${task}`)
    );
    return [Users, userIndex];
  } catch (err) {
    console.log("Invalid token");
  }
};
