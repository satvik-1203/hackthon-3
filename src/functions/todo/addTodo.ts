import readlineSync from "readline-sync";
import { readDB, verifyJWT, writeDB } from "../../misc";
import { v4 as uuid } from "uuid";
import chalk from "chalk";

const addTodo = async (): Promise<void> => {
  try {
    console.log();
    const payload: any = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;

    const index = Users.findIndex((user) => user.email === payload.email);

    if (index === -1) return console.log(chalk.red.bold("No user in the db"));

    const todo = readlineSync.question(
      chalk.blue("Enter a todo you want to add: ")
    );
    console.log();
    if (!Users[index].todo) Users[index].todo = [];
    const id = uuid();
    Users[index].todo?.push({
      id,
      todo,
    });
    await writeDB(Users);
    console.log(chalk.magenta("Todo added in the db, with id " + id));
  } catch (err) {
    console.log(chalk.red.bold(err.message));
  }
};
export default addTodo;
