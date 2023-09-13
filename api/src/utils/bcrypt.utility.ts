import bcrypt from "bcryptjs";

export const encrypt = async (pass: string) => {
  const passwordHash = await bcrypt.hash(pass, 10);
  return passwordHash;
};

export const verified = async (pass: string, passHash: string) => {
  const isCorrect = await bcrypt.compare(pass, passHash);
  return isCorrect;
};
