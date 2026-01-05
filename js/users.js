document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  /* 1️⃣ Check: email already exists? */
  const { data: existingUser, error: checkError } = await supabase
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
    alert("User already exists ❌");
    return;
  }

  /* 2️⃣ Insert new user */
  const { error: insertError } = await supabase
    .from("users")
    .insert([
      {
        email: email,
        password: password
      }
    ]);

  if (insertError) {
    console.error(insertError);
    alert("Error creating user");
    return;
  }

  alert("User registered successfully ✅");
  document.getElementById("userForm").reset();
});
