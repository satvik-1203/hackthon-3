import readline from "readline-sync";
import { IUser } from "../interface";
import { readDB } from "../misc";
import { readFile, writeFile } from "fs/promises";

const createAccount = async (): Promise<void> => {
  const url = "database/Users.json";
  const labels = ["Name", "Email", "Password"];
  const userDetails: string[] = [];
  while (userDetails.length < labels.length) {
    const answer = readline
      .question(`Enter your ${labels[userDetails.length]}: `)
      .trim();
    if (answer) userDetails.push(answer);
  }
  const [name, email, password] = userDetails;
  const userInfo: IUser = {
    name,
    email,
    password,
    todo: [],
  };

  const Users = await readDB();
  if (!Users) return;
  const exist = Users.find((user) => user.email === email);
  if (exist) {
    console.log("Email already exist, Please try again...");
    createAccount();
    return;
  }
  Users.push(userInfo);

  await writeFile(url, JSON.stringify(Users)).catch((err) => console.log(err));
};

export default createAccount;
