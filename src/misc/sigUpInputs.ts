import readline from "readline-sync";

export default () => {
  const name = readline.question("Enter your Name: ");
  const email = readline.questionEMail("Enter your Email: ");
  let password = readline.question("Enter your password: ", {
    hideEchoBack: true,
  });
  const confirmPassword = readline.question("Confirm your password: ", {
    hideEchoBack: true,
  });
  return { name, email, password, confirmPassword };
};
