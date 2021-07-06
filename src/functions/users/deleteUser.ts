import chalk from "chalk";
import { readFile, writeFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";
import { verifyJWT } from "../../misc";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const filterUsers = users.filter((user) => user.email !== payload.email);
    if (filterUsers.length === users.length)
      return console.log(chalk.red.bold("No user found in the db"));
    await writeFile(dataBase, JSON.stringify(data));
    console.log(chalk.magenta("Deleted the user in the db"));
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};
