import { userFunc, todoFunc } from "../functions";
const { createAccount, login } = userFunc;
const { addTodo, displayTodo, deleteTodo } = todoFunc;

export default async (optionNo: number): Promise<void> => {
  console.clear();
  switch (optionNo) {
    case 1:
      return await createAccount();
    case 2:
      return await login();
    case 3:
      return await addTodo();
    case 4:
      return await deleteTodo();
    case 5:
      await displayTodo();
      return;
  }
};
