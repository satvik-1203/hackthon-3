import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import { readDB } from "../misc";
import { writeFile } from "fs/promises";
import { dataBase } from "../BASEURL";
require("dotenv").config();

const addTodo = async (): Promise<void> => {
  try {
    const Users = await readDB();
    const token = readlineSync.question("Please enter your token: ");
    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("No jwt signature");
    const payload: any = jwt.verify(token, signature);

    if (!Users) return console.log("Couldn't read the db");

    const index = Users.findIndex((user) => user.email === payload.email);

    const todo = readlineSync.question("Enter a todo you want to add: ");

    Users[index].todo?.push(todo);
    await writeFile(dataBase, JSON.stringify(Users));
  } catch (err) {
    console.log("Invalid token");
  }
};
export default addTodo;
