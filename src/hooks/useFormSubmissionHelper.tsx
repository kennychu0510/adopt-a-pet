import { FormTypeSchema } from '@/utils/ZodSchema';
import React, { useState } from 'react';
import z from 'zod';
import { toast } from 'react-toastify';

export default function useFormSubmissionHelper({
  type,
}: {
  type: z.infer<typeof FormTypeSchema>;
}) {
  async function handleFormSubmit(form: FormData) {
    const submittedForm = {
      name: form.get('name'),
      contact: form.get('contact'),
      description: form.get('description'),
      type: form.get('type'),
      image: form.get('image') ?? undefined,
    };
    console.log(submittedForm);
    const submissionResult = await fetch(`/api/form?type=${type}`, {
      method: 'POST',
      body: JSON.stringify(submittedForm),
    });
    const result = await submissionResult.json();
    if (!submissionResult.ok) {
      throw new Error(result.message);
    }
    return result
  }
  return { handleFormSubmit };
}
