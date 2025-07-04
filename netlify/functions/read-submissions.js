import { createClient } from '@supabase/supabase-js';

// --- Initialize Supabase Client ---
// This is done outside the handler to be reused across warm function invocations.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Ensure Supabase credentials are provided
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Server configuration error: Missing Supabase URL or Key.");
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // --- Ensure the request is a GET request ---
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // --- Fetch data from the 'Appreciations' table ---
    const { data, error } = await supabaseClient
      .from('submissions')
      .select('email, phone, name')
      .order('created_at', { ascending: false });

    if (error) {
      // Catches RLS errors or other database issues
      console.error("DATABASE SELECT ERROR:", error);
      return res.status(500).json({ error: "Database query failed.", details: error.message });
    }

    // --- Return the fetched data ---
    return res.status(200).json(data);

  } catch (err) {
    console.error("UNEXPECTED ERROR:", err);
    return res.status(500).json({ error: "An unexpected server error occurred." });
  }
}
