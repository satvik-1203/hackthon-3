import readlineSync from "readline-sync";
import { verifyJWT } from "../../misc";
import chalk from "chalk";
import { readFile, writeFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";

export default async (): Promise<void> => {
  try {
    const payload: any = verifyJWT();
    if (!payload) return;
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const id = readlineSync.question(
      chalk.blue("Enter the id of the todo which u would like to delete: ")
    );
    const userIndex = users.findIndex((user) => user.email === payload.email);
    const user = users[userIndex];
    if (!user.todo || user.todo.length === 0)
      return console.log(chalk.hex("FE5663")("No todo for deleting")); // useless
    const deletedTodo = user.todo.filter((todo) => todo.id !== id);
    if (deletedTodo.length === user.todo.length)
      return console.log(chalk.red.bold("Invalid todo ID"));
    user.todo = deletedTodo;

    await writeFile(dataBase, JSON.stringify(data));
    console.log(chalk.magenta("\nDeleted the todo"));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
