"use server";
import { AdoptionSchema } from "@/utils/ZodSchema";

export async function submitAdoptionForm(form: FormData) {
  const validatedForm = AdoptionSchema.parse({
    name: form.get("name"),
    contact: form.get("contact"),
    description: form.get("description"),
    type: form.get("type"),
    image: form.get("image"),
  });

  // const {data, error} = await supabase.from('Adoption').insert({
  //   name:
  // })
  console.log(validatedForm);
  // console.log(form.get('name'));
  // console.log(form.get('contact'));
  // console.log(form.get('description'));
  // console.log(form.get('type'));
  // console.log(form.get('type'));
}
