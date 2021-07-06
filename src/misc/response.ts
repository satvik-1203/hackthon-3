import { userFunc, todoFunc } from "../functions";
const { createAccount, login, deleteUser, allUsers } = userFunc;
const { addTodo, displayTodo, deleteTodo, updateTodo, selectTodo } = todoFunc;

export default async (optionNo: number): Promise<void> => {
  console.clear();
  switch (optionNo) {
    case 1:
      await createAccount();
      break;
    case 2:
      await login();
      break;
    case 3:
      await deleteUser();
      break;
    case 4:
      await selectTodo();
      break;
    case 5:
      await addTodo();
      break;
    case 6:
      await deleteTodo();
      break;
    case 7:
      await updateTodo();
      break;
    case 8:
      await displayTodo();
      break;
    case 9:
      await allUsers();
      break;
  }
};
