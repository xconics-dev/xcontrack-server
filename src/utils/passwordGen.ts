import Config from "../config/index.js";

export const passwordGen = (
  length: number = Config.DEFAULT_PASSWORD_LENGTH
) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const allChars = lowercase + uppercase + numbers;

  // Ensure password has at least one of each type
  const getRandom = (set: string) =>
    set[Math.floor(Math.random() * set.length)];

  let password = [
    getRandom(lowercase),
    getRandom(uppercase),
    getRandom(numbers),
  ];

  // Fill the remaining characters randomly
  for (let i = password.length; i < length; i++) {
    password.push(getRandom(allChars));
  }

  // Shuffle characters to avoid predictable pattern
  password = password.sort(() => Math.random() - 0.5);

  return password.join("");
};
