import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import displayTodo from "./displayTodo";
import { writeDB, readDB, verifyJWT } from "../../misc";
require("dotenv").config();

export default async () => {
  try {
    const payload: any = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;
    const id = readlineSync.question(
      "Enter the id of the todo which u would like to delete: "
    );
    const userIndex = Users.findIndex((user) => user.email === payload.email);
    const user = Users[userIndex];
    if (!user.todo || user.todo.length === 0)
      return console.log("No todo for deleting");
    const deletedTodo = user.todo.filter((todo) => todo.id !== id);
    if (deletedTodo.length === user.todo.length)
      return console.log("Invalid todo ID");
    user.todo = deletedTodo;

    await writeDB(Users);
    console.log("\nDeleted the todo");
  } catch (err) {
    console.log(err.message);
  }
};
