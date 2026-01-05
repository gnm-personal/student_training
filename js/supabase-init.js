const SUPABASE_URL = "https://duvpeufsifgjgynfwqxp.supabase.co";   // your project url
const SUPABASE_ANON_KEY = "sb_publishable_CiKs3Kg-0CTpgCpg4cJ5yQ_x4V8lWqd";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

if (supabase) {
  console.log("Database connected:", supabase);
} else {
  console.log("Database not connected");
  return 0;
}
