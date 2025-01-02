import supabase from "../../supabase";

export async function signup(
  email: string,
  password: string,
  username: string,
  dob: Date
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)
    throw new Error(
      "Signup failed, the users data was not inserted into the database upon signup failure \n\n ||" +
        error.message
    );

  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .insert([{ username, photo: "", email, dob, UID: data.user?.id }])
    .select();

  if (dbError) throw new Error("Signup failed \n\n" + dbError.message);

  return data.user;
}

export async function signin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Failed to signin \n\n ||" + error.message);

  return data.user;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  return error;
}
