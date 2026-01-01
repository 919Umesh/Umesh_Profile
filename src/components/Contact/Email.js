const SUPABASE_URL = "https://xuodtwztsrbqtfiisxrq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1b2R0d3p0c3JicXRmaWlzeHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjM4MzQsImV4cCI6MjA2ODMzOTgzNH0.6LgBKcqa_fzM0czazc5eo6Zkj6FX_H_AftJvIy5i_y8";

export const sendContactEmail = async (formData) => {
  const endpoint = `${SUPABASE_URL}/functions/v1/query-mail`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'apikey': SUPABASE_ANON_KEY,
  };

  const requestBody = {
    email: "thakuriumesh919@gmail.com",
    email_type: "CONTACT_QUERY",   
    query_data: {
      name: formData.name,
      email: formData.email, 
      message: formData.message,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, error: result };
    }
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: error.message };
  }
};