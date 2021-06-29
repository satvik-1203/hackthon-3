import { createAccount } from "../functions";

export default async (optionNo: number): Promise<void> => {
  switch (optionNo) {
    case 1:
      createAccount();
  }
};
