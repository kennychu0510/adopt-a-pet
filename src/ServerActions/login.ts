"use server";

import jwt from "jsonwebtoken";
import { ENV } from "../../env";

const USERNAME = ENV.ADMIN_USERNAME;
const PASSWORD = ENV.ADMIN_PASSWORD;
const SECRET = ENV.JWT_SECRET;

export async function Login(
  previousState: any,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username !== USERNAME || password !== PASSWORD) {
    return {
      success: false,
      message: "Invalid Credentials",
    };
  }

  const timestampIn24Hours = new Date().getTime() + 24 * 60 * 60 * 1000;

  const token = jwt.sign(
    {
      payload: "i am admin",
      expire: timestampIn24Hours,
    },
    SECRET,
  );

  return {
    success: true,
    message: token,
  };
}
