import readlineSync from "readline-sync";

export default (): number => {
  const answer = readlineSync.questionInt(
    "Choose an options from the following: "
  );
  if (answer < 0 || answer > 4) throw "";
  return answer;
};
