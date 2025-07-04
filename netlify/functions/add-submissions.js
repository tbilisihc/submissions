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

// --- Netlify Function Handler for POST requests ---
export async function handler(event, context) {
  // --- Ensure the request is a POST request ---
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Allow': 'POST' },
      body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }),
    };
  }

  try {
    // --- Parse the request body ---
    // The event.body is a string, so it must be parsed into a JSON object.
    const { name, email, phone } = JSON.parse(event.body);

    // --- Validate Input ---
    // Ensure the most critical fields are present.
    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "The 'name' and 'email' fields are required." }),
      };
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
      .single();

    // --- Handle Database Errors ---
    if (error) {
      console.error("DATABASE INSERT ERROR:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Database operation failed.",
          details: error.message,
          hint: error.hint
        }),
      };
    }

    // --- Return Success Response ---
    // 201 Created is the correct status code for a successful POST.
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

  } catch (err) {
    // --- Handle Unexpected Errors (e.g., JSON parsing) ---
    console.error("UNEXPECTED ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An unexpected server error occurred.", details: err.message }),
    };
  }
}
