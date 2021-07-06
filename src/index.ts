import { cliMenu, option, response } from "./misc";
import readlineSync from "readline-sync";
import chalk from "chalk";
async function main() {
  try {
    console.clear();
    cliMenu();
    let optionNo = option();
    if (optionNo === 0) return console.log(chalk.magenta("Exiting..."));
    await response(optionNo);
    const again = readlineSync.keyInYNStrict(
      chalk.cyan.bold("\nDo you want to continue: ")
    );
    if (again) {
      main();
    }
  } catch (err) {
    console.log(chalk.red.bold("Invalid option, Please try again..."));
    setTimeout(main, 2000);
  }
}
main();
