export default async function handler(req, res) {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        text: "No prompt received",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-12b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        text: "OpenRouter Error",
        error: data,
      });
    }

    return res.status(200).json({
      text:
        data?.choices?.[0]?.message?.content ||
        "No response generated.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      text: "AI service unavailable.",
      error: err.message,
    });
  }
}
