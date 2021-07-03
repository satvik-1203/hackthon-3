import chalk from "chalk";
import readlineSync from "readline-sync";
import { readDB, verifyJWT } from "../../misc";

require("dotenv").config();

export default async (): Promise<void> => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return console.log(chalk.red.bold("No users"));
    const userIndex = Users.findIndex((obj) => obj.email === payload.email);

    console.log("\n");
    if (!Users[userIndex].todo)
      return console.log(chalk.redBright("The user has no todo"));
    Users[userIndex].todo?.forEach((task, index) =>
      console.log(
        chalk.magenta(`Todo ${index + 1} "${task.todo}" with id of ${task.id}`)
      )
    );
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};
