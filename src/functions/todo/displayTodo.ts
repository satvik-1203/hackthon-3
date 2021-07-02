import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import { readDB } from "../../misc";
import { IUser } from "../../interface";
require("dotenv").config();

export default async (token?: string): Promise<void> => {
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

    console.log("\n");
    if (!Users[userIndex].todo) return console.log("The user has no todo");
    Users[userIndex].todo?.forEach((task, index) =>
      console.log(`Todo ${index + 1} "${task.todo}" with id of ${task.id}`)
    );
  } catch (err) {
    console.log("Invalid token");
  }
};
