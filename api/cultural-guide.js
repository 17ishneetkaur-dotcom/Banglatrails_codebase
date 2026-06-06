export default async function handler(req, res) {
  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      text: "No prompt received",
    });
  }

  const q = prompt.toLowerCase();

  let answer = "";

  if (q.includes("tribal") || q.includes("dance")) {
    answer =
      "For tribal dance experiences, Purulia is one of the most vibrant destinations in West Bengal. The famous Chhau dance blends martial arts, storytelling, and colorful masks. During local festivals, entire villages come alive with performances that celebrate centuries of cultural tradition.";
  }

  else if (q.includes("food") || q.includes("eat")) {
    answer =
      "Murshidabad, Kolkata, and Darjeeling each offer unique culinary experiences. From rich Nawabi cuisine to iconic Bengali sweets and Himalayan flavors, food in Bengal reflects the region's remarkable cultural diversity.";
  }

  else if (q.includes("festival")) {
    answer =
      "West Bengal is renowned for its festivals, especially Durga Puja. Kolkata becomes a living art gallery during the celebrations, while districts across Bengal showcase unique local traditions, music, crafts, and community gatherings.";
  }

  else if (q.includes("nature")) {
    answer =
      "For nature lovers, the Sundarbans, Darjeeling hills, and Dooars region offer unforgettable experiences. From mangrove forests and Royal Bengal Tigers to mist-covered mountains and tea gardens, Bengal's landscapes are incredibly diverse.";
  }

  else if (q.includes("history") || q.includes("heritage")) {
    answer =
      "Murshidabad is one of Bengal's most significant historical destinations. Once the capital of Bengal, it is home to magnificent palaces, mosques, and monuments that tell the story of the region's rich past.";
  }

  else {
    answer =
      "West Bengal is a land where literature, festivals, cuisine, nature, and history blend together beautifully. Each district offers its own unique story, from the tea gardens of Darjeeling to the heritage sites of Murshidabad and the cultural vibrancy of Kolkata.";
  }

  return res.status(200).json({
    text: answer,
  });
}
