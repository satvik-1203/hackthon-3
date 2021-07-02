import readlineSync from "readline-sync";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readDB } from "../../misc";
require("dotenv").config();

const login = async (): Promise<void> => {
  try {
    const Users = await readDB();
    if (!Users) return;
    const email = readlineSync.question("Please enter your email: ");

    const user = Users.find((user) => user.email === email);
    const password = readlineSync.question("Please enter your password: ", {
      hideEchoBack: true,
    });
    console.log();
    if (!user) {
      console.log("No User found in the db, Please try again: ");
      return login();
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) return console.log("Invalid credentials");
    const jwtSign = process.env["JWT-SIGN"];
    if (!jwtSign) return console.log("No jwt sign available");
    const token = jwt.sign({ email: user.email }, jwtSign, {
      expiresIn: "1h",
    });
    console.log(`The user token is: ${token}`);
  } catch (err) {
    return console.log("Something went wrong");
  }
};

export default login;
