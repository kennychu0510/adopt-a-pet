import services from '@/services';
import { AdoptionSchema, ContactUsSchema, FormTypeSchema, MissingFormSchema, WishSchema } from '@/utils/ZodSchema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const rawFormType = searchParams.get('type');
    const formType = FormTypeSchema.parse(rawFormType);
    const form = await request.json();

    if (formType === 'adoption') {
      const adoptionForm = AdoptionSchema.parse(form);
      const { error } = await services.createAdoption(adoptionForm);
      if (error) {
        return NextResponse.json({ message: error.toString() }, { status: 500 });
      }
    } else if (formType === 'missing') {
      const missingForm = MissingFormSchema.parse(form);
      const { error } = await services.createMissing(missingForm);
      if (error) {
        return NextResponse.json({ message: error.toString() }, { status: 500 });
      }
    } else if (formType === 'wish') {
      const wishForm = WishSchema.parse(form);
      const { error } = await services.createWish(wishForm);
      if (error) {
        return NextResponse.json({ message: error.toString() }, { status: 500 });
      }
    } else if (formType === 'contact') {
      const contactForm = ContactUsSchema.parse(form);
      console.log('inserting contact form', contactForm);
      const { error } = await services.createContactUs(contactForm);
      console.log({ error });
      if (error) {
        return NextResponse.json({ message: error.toString() }, { status: 500 });
      }
    } else {
      throw new Error('Failed to process form type');
    }

    return NextResponse.json({ message: 'update to database success' });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.toString() }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.toString() }, { status: 400 });
    }
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
