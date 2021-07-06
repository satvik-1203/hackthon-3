import { verifyJWT } from "../../misc";
import readlineSync from "readline-sync";
import chalk from "chalk";
import { dataBase } from "../../BASEURL";
import { readFile } from "fs/promises";
import { IUser } from "../../interface";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const id = readlineSync.question(
      chalk.blue("Please enter the id of the todo that you want to see: ")
    );
    console.log();
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.email === payload.email);
    const user = users[userIndex];
    const todo = user.todo?.find((todo) => todo.id === id);
    if (!todo) return console.log(chalk.red("No todo found with that id"));
    console.log(chalk.magenta(todo.todo));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
