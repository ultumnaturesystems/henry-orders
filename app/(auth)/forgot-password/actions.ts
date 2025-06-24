"use server";

import { createClient } from "@/utils/supabase/server";

export async function forgotPassword(email: string) {
  const supabase = await createClient();

  const userId = await getUserIdByEmail(email);
  if (!userId) throw new Error("Email not found");
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Retrieves a user's ID by their email address using a database function.
 * @param {string} email - The email address to look up.
 * @returns {Promise<string | null>} A Promise that resolves to the user's ID, or null if not found.
 */
export async function getUserIdByEmail(email: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_id_by_email", {
    p_email: email,
  });

  if (error) {
    console.error("getUserIdByEmail error", error);
    return null;
  }

  return data;
}
