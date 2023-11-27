import { AdoptionSchema, FormTypeSchema, MissingFormSchema, WishSchema } from '@/utils/ZodSchema';
import z from 'zod';

export default function useFormSubmissionHelper({ type }: { type: z.infer<typeof FormTypeSchema> }) {
  async function handleFormSubmit(form: FormData) {
    let validatedForm: any;
    if (type === 'adoption') {
      validatedForm = AdoptionSchema.parse({
        name: form.get('name'),
        contact: form.get('contact'),
        petName: form.get('petName'),
        description: form.get('description'),
        type: form.get('type'),
        image: form.get('image'),
      });
    } else if (type === 'missing') {
      validatedForm = MissingFormSchema.parse({
        name: form.get('name'),
        contact: form.get('contact'),
        petName: form.get('petName'),
        description: form.get('description'),
        type: form.get('type'),
        image: form.get('image'),
        lastSeen: form.get('lastSeen'),
        lat: Number(form.get('lat')),
        lng: Number(form.get('lng')),
      });
    } else if (type === 'wish') {
      validatedForm = WishSchema.parse({
        name: form.get('name'),
        description: form.get('description'),
        contact: form.get('contact'),
        type: form.get('type'),
      });
    }
    const submissionResult = await fetch(`/api/form?type=${type}`, {
      method: 'POST',
      body: JSON.stringify(validatedForm),
    });
    const result = await submissionResult.json();
    if (!submissionResult.ok) {
      throw new Error(result.message);
    }
    return result;
  }
  return { handleFormSubmit };
}
