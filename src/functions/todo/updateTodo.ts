import { readDB, verifyJWT, writeDB } from "../../misc";
import readlineSync from "readline-sync";
import displayTodo from "./displayTodo";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;
    const id = readlineSync.question(
      "Please enter the todo ID that want to update: "
    );
    const user = Users[Users.findIndex((user) => user.email === payload.email)];
    if (!user.todo) return console.log("User has no task");
    const todoIndex = user.todo?.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return console.log("No todo found with that id");
    const updatedTodo = readlineSync.question(
      "Please enter the updated todo: "
    );

    user.todo[todoIndex].todo = updatedTodo;

    await writeDB(Users);
    console.log("Updated the todo");
  } catch (err) {
    console.log(err.message);
  }
};
