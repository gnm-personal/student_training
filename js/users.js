document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  /* 1️⃣ Check if email already exists */
  const { data: existingUser, error: checkError } =
    await supabaseClient
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

  if (checkError) {
    console.error(checkError);
    alert("Error checking user");
    return;
  }

  if (existingUser) {
    alert("Email already registered ❌");
    return;
  }

  /* 2️⃣ Insert new user */
  const { error: insertError } =
    await supabaseClient
      .from("users")
      .insert([
        {
          name: name,
          email: email,
          password: password
          // id auto-generate hoga
          // created_at auto-fill hoga
        }
      ]);

  if (insertError) {
    console.error(insertError);
    alert("Registration failed");
    return;
  }

  alert("User registered successfully ✅");
  e.target.reset();
});
