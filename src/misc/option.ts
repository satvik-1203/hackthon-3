import readlineSync from "readline-sync";

export default (): number => {
  const answer = readlineSync.questionInt(
    "Choose an options from the following: "
  );
  console.log();
  if (answer < 0 || answer > 8) throw "";
  return answer;
};
