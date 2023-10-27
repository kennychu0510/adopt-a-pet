'use server';

export async function submitAdoptionForm(form: FormData) {
  console.log(form.get('name'));
  console.log(form.get('contact'));
  console.log(form.get('description'));
  console.log(form.get('type'));
}
