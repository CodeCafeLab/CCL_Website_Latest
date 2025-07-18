export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/your-model:generateText?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        /* your request body */
      }),
    }
  );
  // ...handle response...
}
