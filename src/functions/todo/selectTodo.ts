import { verifyJWT, readDB, writeDB } from "../../misc";
import readlineSync from "readline-sync";
import chalk from "chalk";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const id = readlineSync.question(
      chalk.blue("Please enter the id of the todo that you want to see: ")
    );
    console.log();
    const Users = await readDB();
    if (!Users) return;
    const userIndex = Users.findIndex((user) => user.email === payload.email);
    const user = Users[userIndex];
    const todo = user.todo?.find((todo) => todo.id === id);
    if (!todo) return console.log(chalk.red("No todo found with that id"));
    console.log(chalk.magenta(todo.todo));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
