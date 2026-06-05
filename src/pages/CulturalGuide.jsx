const handleAsk = async () => {
  if (!query.trim() || isLoading) return;

  setIsLoading(true);
  setResponse("");

  try {
    const districtSummaries = districts.map(d =>
      `${d.name}: ${d.subtitle}. Food: ${d.food.join(", ")}. Festivals: ${d.festivals.join(", ")}. Landmarks: ${d.historicalPlaces.join(", ")}. Nature: ${d.nature.join(", ")}. Crafts: ${d.crafts.join(", ")}.`
    ).join("\n");

    const res = await fetch("/api/cultural-guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
You are BanglaTrails Cultural Guide — an expert on West Bengal's heritage, culture, food, festivals, and travel.

Here is information about 10 districts of West Bengal:

${districtSummaries}

User Question:
${query}

Provide a warm, informative, and culturally rich answer in 3-5 sentences.
Recommend specific districts when relevant.
Be poetic but factual.
Use a storytelling tone.
`,
      }),
    });

    const data = await res.json();

    setResponse(data.text || "No response received.");
  } catch (error) {
    console.error(error);
    setResponse("Sorry, something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
