'use server';

import jwt from 'jsonwebtoken';

const USERNAME = 'admin';
const PASSWORD = 'admin';
const SECRET = 'adoptApetAdmin';

export async function Login(previousState: any, formData: FormData): Promise<{ success: boolean; message: string }> {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username !== USERNAME || password !== PASSWORD) {
    return {
      success: false,
      message: 'Invalid Credentials',
    };
  }

  const timestampIn24Hours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  const token = jwt.sign(
    {
      payload: 'i am admin',
      expire: timestampIn24Hours,
    },
    SECRET
  );

  return {
    success: true,
    message: token,
  };
}
