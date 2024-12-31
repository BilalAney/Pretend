import supabase from "../../supabase";

export async function getUser(id: string) {
  const { error, data } = await supabase
    .from("users")
    .select()
    .eq("UID", id)
    .single();

  if (error) throw new Error("Failed to fetch that user data!");

  return data;
}
