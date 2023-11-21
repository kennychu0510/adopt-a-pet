export async function postForm(body: Object, formType: string) {
  const result = await fetch(`/api/form?type=${formType}`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  const json = await result.json();
  return json;
}
