import axios from "axios";
import { BASE_URL } from ".";

export const calculateChange = async (
  currency: string,
  purchaseAmount: number,
  tenderAmount: number
) => {
  const response = await axios.post(`${BASE_URL}/api/calculate-change`, {
    currency,
    purchaseAmount: purchaseAmount,
    tenderAmount: tenderAmount,
  });
  return response;
};
