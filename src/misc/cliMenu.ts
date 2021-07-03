export default (): void => {
  const options: string[] = [
    "Exit",
    "Create Account",
    "Login",
    "Delete Account",
    "Select a Todo",
    "Add Todo",
    "Delete Todo",
    "Update Todo",
    "View Todo List",
  ];
  console.log("Welcome to my todo list cli\n");
  console.log("|---------------------------------------------|");
  console.log("|             (:  TODO LIST  :)               |");
  console.log("|_____________________________________________|");
  options.forEach((element, index) => {
    console.log("|                                             |");
    let str = `|     Choose ${index} to ${element}`;
    while (str.length < 46) {
      str += " ";
    }
    str += "|";
    console.log(str);
  });
  console.log("|_____________________________________________|\n");
};
