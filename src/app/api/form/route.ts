import { AdoptionSchema, FormTypeSchema } from '@/utils/ZodSchema';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type ResponseData = {
  message: string;
};


export async function GET(request: Request) {
  return new Response('hello from next js');
}


export async function POST(request: Request) {
  const {searchParams} = new URL(request.url);

  try {
    const rawFormType = searchParams.get('type')
    const formType = FormTypeSchema.parse(rawFormType)
    const form = await request.json()

    switch (formType) {
      case 'adoption':
        const adoptionForm = AdoptionSchema.parse(form)
        break;

    }

  return new Response('received valid form');

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({message: error}, {status: 400});
    } else if (error instanceof Error) {
      return NextResponse.json({message: error.message}, {status: 400});
    }
    return NextResponse.json({message: 'server error'}, {status: 500});
  }

}
