// app/utils/decodeJWT.js
import { decode as atob } from "base-64";

export const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error("❌ Failed to decode token:", err.message);
    return null;
  }
};
