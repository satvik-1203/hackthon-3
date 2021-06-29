import { cliMenu, option, response } from "./misc";

async function main() {
  console.clear();
  cliMenu();

  try {
    let optionNo = option();
    if (optionNo === 0) return;
    await response(optionNo);
  } catch (err) {
    main();
  }
}
main();
