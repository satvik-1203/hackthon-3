import chalk from "chalk";

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
  console.log(
    "      " + chalk.bgBlack.white("                                  ")
  );
  console.log(
    "      " + chalk.bgBlack.white("    Welcome to my Todo List cli   ")
  );
  console.log(
    "      " + chalk.bgBlack.white("                                  ")
  );
  console.log();
  console.log(chalk.blue("|---------------------------------------------|"));
  console.log(
    chalk.blue("|") +
      chalk.red("             (:  TODO LIST  :)               ") +
      chalk.blue("|")
  );
  console.log(chalk.blue("|---------------------------------------------|"));
  options.forEach((element, index) => {
    console.log(chalk.blue("|                                             |"));
    let str = `${chalk.blue("|")}     ${chalk.cyan.bold(
      `Choose ${index} to ${element}`
    )}`;
    while (str.length < 75) {
      str += " ";
    }
    str += "|";
    console.log(chalk.blue(str));
  });
  console.log(chalk.blue("|_____________________________________________|\n"));
};
