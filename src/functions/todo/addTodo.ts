import readlineSync from "readline-sync";
import { verifyJWT } from "../../misc";
import { v4 as uuid } from "uuid";
import chalk from "chalk";
import { readFile, writeFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";

const addTodo = async (): Promise<void> => {
  try {
    console.log();
    const payload: any = verifyJWT();
    if (!payload) return;
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const users: IUser[] = JSON.parse(data);
    const index = users.findIndex((user) => user.email === payload.email);

    if (index === -1) return console.log(chalk.red.bold("No user in the db"));

    const todo = readlineSync.question(
      chalk.blue("Enter a todo you want to add: ")
    );
    console.log();
    if (!users[index].todo) users[index].todo = [];
    const id = uuid();
    users[index].todo?.push({
      id,
      todo,
    });
    await writeFile(dataBase, JSON.stringify(data));
    console.log(chalk.magenta("Todo added in the db, with id " + id));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
export default addTodo;
