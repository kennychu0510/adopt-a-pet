import { getTimestampMinusOneWeek } from "@/utils/helper";
import supabase from "@/utils/supabase";

export async function getAdoptionListForLanding() {
  return supabase
    .from("Adoption")
    .select("*")
    .gte("created_at", getTimestampMinusOneWeek())
    .limit(10)
    .order("created_at", { ascending: false })
    .is("show", true);
}

export async function getMissingListForLanding() {
  return supabase
    .from("Missing")
    .select("*")
    .gte("created_at", getTimestampMinusOneWeek())
    .limit(10)
    .order("created_at", { ascending: false })
    .is("show", true);
}

export async function getWishListForLanding() {
  return supabase
    .from("Wish")
    .select("*")
    .gte("created_at", getTimestampMinusOneWeek())
    .limit(10)
    .order("created_at", { ascending: false })
    .is("show", true);
}
