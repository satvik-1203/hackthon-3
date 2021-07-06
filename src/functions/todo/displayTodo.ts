import chalk from "chalk";
import { readFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";
import { verifyJWT } from "../../misc";

export default async (): Promise<void> => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const userIndex = users.findIndex((obj) => obj.email === payload.email);

    console.log("\n");
    if (!users[userIndex].todo)
      return console.log(chalk.redBright("The user has no todo"));
    users[userIndex].todo?.forEach((task, index) =>
      console.log(
        chalk.magenta(`Todo ${index + 1} "${task.todo}" with id of ${task.id}`)
      )
    );
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};
