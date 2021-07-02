import { cliMenu, option, response } from "./misc";
import readlineSync from "readline-sync";
async function main() {
  console.clear();
  cliMenu();
  try {
    let optionNo = option();
    if (optionNo === 0) return console.log("Exiting...");
    await response(optionNo);
    const again = readlineSync.keyInYNStrict("\nDo you want to continue: ");
    if (again) {
      main();
    }
  } catch (err) {
    main();
  }
}
main();
