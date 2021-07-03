import { IUser } from "../interface";
import { writeFile } from "fs/promises";
import { dataBase } from "../BASEURL";

export default async (data: IUser[]): Promise<void> => {
  try {
    await writeFile(dataBase, JSON.stringify(data));
  } catch (err) {
    console.log("Couldn't write the user in the db");
  }
};
