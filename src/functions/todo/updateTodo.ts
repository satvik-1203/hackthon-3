import { readDB, verifyJWT, writeDB } from "../../misc";
import readlineSync from "readline-sync";
import chalk from "chalk";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;
    const id = readlineSync.question(
      chalk.blue("Please enter the todo ID that want to update: ")
    );
    const user = Users[Users.findIndex((user) => user.email === payload.email)];
    if (!user.todo)
      return console.log(chalk.redBright.bold("User has no task"));
    const todoIndex = user.todo?.findIndex((todo) => todo.id === id);
    if (todoIndex === -1)
      return console.log(chalk.bgRedBright.bold("No todo found with that id"));
    const updatedTodo = readlineSync.question(
      "Please enter the updated todo: "
    );

    user.todo[todoIndex].todo = updatedTodo;

    await writeDB(Users);
    console.log(chalk.magenta("Updated the todo"));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
