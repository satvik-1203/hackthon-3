import { IUser } from "../interface";
import { readFile } from "fs/promises";
import { dataBase } from "../BASEURl";
export default async (): Promise<void | IUser[]> => {
  try {
    const data = await readFile(dataBase, "utf-8");
    if (!data) return;
    const Users: IUser[] = JSON.parse(data);
    return Users;
  } catch (err) {
    console.log("Couldn't read the file");
    return;
  }
};
