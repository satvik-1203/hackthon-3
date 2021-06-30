import { createAccount, login, addTodo } from "../functions";

export default async (optionNo: number): Promise<void> => {
  switch (optionNo) {
    case 1:
      return createAccount();

    case 2:
      return login();
    case 3:
      return addTodo();
  }
};
