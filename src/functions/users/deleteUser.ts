import { readDB, verifyJWT, writeDB } from "../../misc";

export default async () => {
  try {
    const payload = verifyJWT();
    if (!payload) return;
    const Users = await readDB();
    if (!Users) return;
    const filterUsers = Users.filter((user) => user.email !== payload.email);
    if (filterUsers.length === Users.length)
      return console.log("No user found in the db");
    await writeDB(filterUsers);
    console.log("Deleted the user in the db");
  } catch (err) {
    console.log(err.message);
  }
};
