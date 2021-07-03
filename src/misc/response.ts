import { userFunc, todoFunc } from "../functions";
const { createAccount, login, deleteUser } = userFunc;
const { addTodo, displayTodo, deleteTodo, updateTodo, selectTodo } = todoFunc;

export default async (optionNo: number): Promise<void> => {
  console.clear();
  switch (optionNo) {
    case 1:
      return await createAccount();
    case 2:
      return await login();
    case 3:
      return await deleteUser();
    case 4:
      return await selectTodo();
    case 5:
      return await addTodo();
    case 6:
      return await deleteTodo();
    case 7:
      return await updateTodo();
    case 8:
      return await displayTodo();
  }
};
