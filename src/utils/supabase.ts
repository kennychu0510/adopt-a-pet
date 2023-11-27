import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { ENV } from "../../env";

export default createClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
