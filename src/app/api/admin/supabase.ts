import supabase from "@/utils/supabase"

export const getAdoption = async () => {
  const result = await supabase.from('Adoption').select('*').order("created_at", { ascending: false })
  return result.data
}

export const getMissing = async () => {
  const result = await supabase.from('Missing').select('*').order("created_at", { ascending: false })
  return result.data
}

export const getWishes = async () => {
  const result = await supabase.from('Wish').select('*').order("created_at", { ascending: false })
  return result.data
}

export const getMessages = async () => {
  const result = await supabase.from('Contact Us').select('*').order("created_at", { ascending: false })
  return result.data
}