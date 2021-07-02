import readlineSync from "readline-sync";
import jwt from "jsonwebtoken";
import displayTodo from "./displayTodo";
import { writeDB } from "../../misc";
require("dotenv").config();

export default async () => {
  try {
    const token = readlineSync.question("Enter your token: ");
    const signature = process.env["JWT-SIGN"];
    if (!signature) return console.log("No signature.");
    const payload: any = jwt.verify(token, signature);
    const userArr = await displayTodo(token);
    const number = readlineSync.questionInt("Which todo do u want to delete: ");
    if (!userArr) return console.log("Something went wrong");
    let [Users, index] = userArr;
    Users[index].todo = Users[index].todo.filter(
      (todo, index) => index + 1 !== number
    );
    Users = Users.filter((User) => User.email != payload.email);
    await writeDB(Users);
    console.log("\nDeleted the todo");
  } catch (err) {
    console.log("Invalid token");
  }
};
