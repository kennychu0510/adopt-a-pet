import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export async function GET(request: Request) {
  return new Response('hello from next js');
}


export async function POST(request: Request) {
  return new Response('hello from next js');
}
