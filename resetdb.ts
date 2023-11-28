import supabase from "@/utils/supabase";

async function main() {
  try {
    const adoptionDelete = await supabase.from('Adoption').delete().gte('id', 0);
    const missingDelete = await supabase.from('Missing').delete().gte('id', 0);
    const wishDelete = await supabase.from('Wish').delete().gte('id', 0);
    const contactUsDelete = await supabase.from('Contact Us').delete().gte('id', 0);
    console.log({adoptionDelete, missingDelete, wishDelete, contactUsDelete})
    console.log('reset DB done')
  } catch (error) {
    console.log(error)
  }
}

main();