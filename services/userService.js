import { supabase } from "../lib/supabase";

export const login = async () => {
  console.log("alksdkj");
  const { data, error } = await supabase.auth.signUp({
    email: "asdasdaw@gmail.com", // email dummy yang kamu generate
    password: "passwordkasir",
    display_name: "kasir1",
    options: {
      data: {
        username: "kasir1",
        role: "kasir",
      },
    },
  });

  if (error) console.log(error);

  return { data, error };
};

export const signUp = async (name, email, password) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.log(signUpError);
    return;
  }

  const userId = signUpData.user.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    name: name,
  });

  if (profileError) {
    console.error("Profile creation error:", profileError.message);
  } else {
    console.log("Profile created successfully!");
  }
};
