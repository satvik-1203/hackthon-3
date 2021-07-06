import { verifyJWT } from "../../misc";
import readlineSync from "readline-sync";
import chalk from "chalk";
import { dataBase } from "../../BASEURL";
import { readFile, writeFile } from "fs/promises";
import { IUser } from "../../interface";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const id = readlineSync.question(
      chalk.blue("Please enter the todo ID that want to update: ")
    );
    const user = users[users.findIndex((user) => user.email === payload.email)];
    if (!user.todo)
      return console.log(chalk.redBright.bold("User has no task"));
    const todoIndex = user.todo.findIndex((todo) => todo.id === id);
    if (todoIndex === -1)
      return console.log(chalk.bgRedBright.bold("No todo found with that id"));
    const updatedTodo = readlineSync.question(
      "Please enter the updated todo: "
    );

    user.todo[todoIndex].todo = updatedTodo;

    await writeFile(dataBase, JSON.stringify(data));
    console.log(chalk.magenta("Updated the todo"));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
