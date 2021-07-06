import { IUser } from "../interface";
import { readFile } from "fs/promises";
import { dataBase } from "../BASEURL";
import chalk from "chalk";
export default async () => {
  try {
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const Users: IUser[] = JSON.parse(data);
    return Users;
  } catch (err) {
    console.log(chalk.red("Couldn't read the file"));
    return;
  }
};
