import axios from "axios";
import { BASE_URL } from ".";

export const getDenominations = async () => {
  const response = await axios.get(`${BASE_URL}/api/denominations`);
  return response;
};
