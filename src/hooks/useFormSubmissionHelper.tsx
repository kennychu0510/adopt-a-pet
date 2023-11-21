import { AdoptionSchema, FormTypeSchema } from '@/utils/ZodSchema';
import z from 'zod';

export default function useFormSubmissionHelper({
  type,
}: {
  type: z.infer<typeof FormTypeSchema>;
}) {
  async function handleFormSubmit(form: FormData) {
    const validatedForm = AdoptionSchema.parse({
      name: form.get('name'),
      contact: form.get('contact'),
      pet_name: form.get('petName'),
      description: form.get('description'),
      type: form.get('type'),
      image: form.get('image'),
    }) 
    console.log(validatedForm);
    const submissionResult = await fetch(`/api/form?type=${type}`, {
      method: 'POST',
      body: JSON.stringify(validatedForm),
    });
    const result = await submissionResult.json();
    if (!submissionResult.ok) {
      throw new Error(result.message);
    }
    return result
  }
  return { handleFormSubmit };
}
