import chalk from "chalk";
import readline from "readline-sync";

export default () => {
  const name = readline.question(chalk.blueBright("Enter your Name: "));
  const email = readline.questionEMail(chalk.blueBright("Enter your Email: "));
  let password = readline.question(chalk.blueBright("Enter your password: "), {
    hideEchoBack: true,
  });
  const confirmPassword = readline.question(
    chalk.blueBright("Confirm your password: "),
    {
      hideEchoBack: true,
    }
  );
  return { name, email, password, confirmPassword };
};
