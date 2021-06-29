export default (): void => {
  const options: string[] = [
    "Exit",
    "Create Account",
    "Login",
    "Add Todo",
    "Todo List",
  ];

  options.forEach((element, index) => {
    console.log(`Choose ${index} to ${element}`);
  });
};
