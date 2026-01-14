// const supabaseClient = window.supabase.createClient(
//   "https://duvpeufsifgjgynfwqxp.supabase.co",
//   "sb_publishable_CiKs3Kg-0CTpgCpg4cJ5yQ_x4V8lWqd"
// );

// if (supabaseClient) {
//   console.log("Database connected:", supabaseClient);
// } else {
//   console.log("Database not connected");
// }

fetch("js/data.json")
  .then(res => res.json())
  .then(config => {
    const supabaseClient = window.supabase.createClient(
      config.supabase_url,
      config.supabase_key
    );

    if (supabaseClient) {
      console.log("Database connected:", supabaseClient);
    } else {
      console.log("Database not connected");
    }
  })
  .catch(err => console.error(err));
