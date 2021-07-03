import readlineSync from "readline-sync";
import chalk from "chalk";

export default (): number => {
  const answer = readlineSync.questionInt(
    chalk.blueBright("Choose an options from the following: ")
  );
  console.log();
  if (answer < 0 || answer > 8) throw "";
  return answer;
};
