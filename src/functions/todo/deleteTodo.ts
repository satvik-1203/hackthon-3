import readlineSync from "readline-sync";
import { writeDB, readDB, verifyJWT } from "../../misc";
import chalk from "chalk";
require("dotenv").config();

export default async (): Promise<void> => {
  try {
    const payload: any = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;
    const id = readlineSync.question(
      chalk.blue("Enter the id of the todo which u would like to delete: ")
    );
    const userIndex = Users.findIndex((user) => user.email === payload.email);
    const user = Users[userIndex];
    if (!user.todo || user.todo.length === 0)
      return console.log(chalk.hex("FE5663")("No todo for deleting")); // useless
    const deletedTodo = user.todo.filter((todo) => todo.id !== id);
    if (deletedTodo.length === user.todo.length)
      return console.log(chalk.red.bold("Invalid todo ID"));
    user.todo = deletedTodo;

    await writeDB(Users);
    console.log(chalk.magenta("\nDeleted the todo"));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
