import { readDB, verifyJWT, writeDB } from "misc";
import readlineSync from "readline-sync";
import displayTodo from "./displayTodo";

export default async () => {
  const token = readlineSync.question("Please enter your token: ");
  const payload = verifyJWT(token);
  if (!payload) return;
  const userArr = await displayTodo(token);
  const option = readlineSync.question("Chose an option you want to update");
  const updateOption = readlineSync.question("Enter the updated todo: ");
  if (!userArr) return;
  const [Users, userIndex] = userArr;
  Users[userIndex].todo[+option - 1] = updateOption;
  await writeDB(Users);
  console.log("Updated the todo");
};
