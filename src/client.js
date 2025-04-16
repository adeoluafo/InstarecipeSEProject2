// 📦 Import the Supabase client creator
import { createClient } from "@supabase/supabase-js";

// 🔑 Import the Supabase URL and API key (make sure these are secured!)
import { SUPABASE_KEY } from "./supabase";
import { SUPABASE_URL } from "./supabase";

// 🚀 Create a Supabase client instance using your URL and API key
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

