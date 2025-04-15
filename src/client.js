import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "./supabase";
import { SUPABASE_URL } from "./supabase";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
