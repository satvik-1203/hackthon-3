import { readFile } from "fs/promises";
import { dataBase } from "../../BASEURL";
import { IUser } from "../../interface";

export default async () => {
  const data = await readFile(dataBase, "utf-8");
  if (!data) return;
  const users: IUser[] = JSON.parse(data);
  const tableUsers = users.map((user) => ({
    name: user.name,
    email: user.email,
  }));
  console.table(tableUsers);
};
