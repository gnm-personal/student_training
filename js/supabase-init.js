// const SUPABASE_URL = "https://duvpeufsifgjgynfwqxp.supabase.co";   // your project url
// const SUPABASE_ANON_KEY = "sb_publishable_CiKs3Kg-0CTpgCpg4cJ5yQ_x4V8lWqd";

const supabaseClient = window.supabase.createClient(
  "https://duvpeufsifgjgynfwqxp.supabase.co",
  "sb_publishable_CiKs3Kg-0CTpgCpg4cJ5yQ_x4V8lWqd"
);

if (supabaseClient) {
  console.log("Database connected:", supabaseClient);
} else {
  console.log("Database not connected");
}
