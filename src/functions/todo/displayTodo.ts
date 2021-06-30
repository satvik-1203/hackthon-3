import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import { readDB } from "../../misc";
require("dotenv").config();

export default async (): Promise<void> => {
  try {
    const token = readlineSync.question("Please enter your token: ");

    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("No signature");
    const payload: any = jwt.verify(token, signature);
    const Users = await readDB();
    if (!Users) return console.log("No users");
    const user = Users.find((obj) => obj.email === payload.email);

    if (!user) return console.log("No user found in the db");
    console.log("\n");
    user.todo.forEach((task, index) => console.log(`${index + 1}) ${task}`));
  } catch (err) {
    console.log("Invalid token");
  }
};
