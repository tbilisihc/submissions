
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This check runs once per container instance, not on every request.
  throw new Error("Server configuration error: Missing Supabase URL or Key.");
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // --- Ensure the request is a POST request ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // --- Validate Input ---
    const { name, email, phone } = req.body;
    if (!text) {
      return res.status(400).json({ error: "The 'text' field is required." });
    }

    // --- Insert Data into Database ---
    const { data, error } = await supabaseClient
      .from("submissions")
      .insert({
        name: name,
        phone: phone,
        email: email
      })
      .select()
      .single(); // .single() ensures we get a single object back, not an array

    // --- Handle Database Errors ---
    if (error) {
      console.error("DATABASE INSERT ERROR:", error);
      // Forward the specific Supabase error message to the client for easier debugging
      return res.status(500).json({
        error: "Database operation failed.",
        details: error.message,
        hint: error.hint
      });
    }

    // --- Return Success Response ---
    // 201 Created is the correct status code for a successful POST
    return res.status(201).json(data);

  } catch (err) {
    // --- Handle Unexpected Errors (e.g., JSON parsing) ---
    console.error("UNEXPECTED ERROR:", err);
    return res.status(500).json({ error: "An unexpected server error occurred.", details: err.message });
  }
}
