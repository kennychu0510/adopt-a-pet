'use server';
import { PetTypeEnum } from "@/types";
import supabase from "@/utils/supabase";
import { AdoptionSchema } from "@/utils/ZodSchema";
import z from 'zod'



export async function submitAdoptionForm(form: FormData) {
  const validatedForm = AdoptionSchema.parse({
    name: form.get('name'),
    contact: form.get('contact'),
    description: form.get('description'),
    type: form.get('type')
  }) 

  // const {data, error} = await supabase.from('Adoption').insert({
  //   name: 
  // })
  console.log(form.get('name'));
  console.log(form.get('contact'));
  console.log(form.get('description'));
  console.log(form.get('type'));
}
