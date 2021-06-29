import { IUser } from "../interface";
import { readFile } from "fs/promises";

export default async (): Promise<void | IUser[]> => {
  const url = "database/Users.json";
  const data = await readFile(url, "utf-8").catch((err) =>
    console.log("Couldn't read the file")
  );
  if (!data) return;
  const Users: IUser[] = JSON.parse(data);
  return Users;
};
