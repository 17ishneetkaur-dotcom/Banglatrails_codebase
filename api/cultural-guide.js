export default async function handler(req, res) {
  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      text: "No prompt received",
    });
  }

  // Extract only the user's actual question
  const userQuestion =
    prompt.split("User Question:")[1] || prompt;

  const q = userQuestion.toLowerCase();

  let answer = "";

  if (
    q.includes("tribal") ||
    q.includes("dance") ||
    q.includes("chhau")
  ) {
    answer =
      "For tribal dance experiences, Purulia is one of the most vibrant destinations in West Bengal. The famous Chhau dance blends martial arts, storytelling, and colorful masks. During local festivals, entire villages come alive with performances that celebrate centuries of cultural tradition.";
  }

  else if (
    q.includes("food") ||
    q.includes("eat") ||
    q.includes("dish") ||
    q.includes("sweet") ||
    q.includes("cuisine")
  ) {
    answer =
      "Murshidabad, Kolkata, and Darjeeling each offer unique culinary experiences. From rich Nawabi cuisine and famous Bengali sweets to Himalayan flavours and tea culture, food in Bengal reflects the region's remarkable cultural diversity.";
  }

  else if (
    q.includes("festival") ||
    q.includes("celebration") ||
    q.includes("durga puja")
  ) {
    answer =
      "West Bengal is renowned for its festivals, especially Durga Puja. Kolkata becomes a living art gallery during the celebrations, while districts such as Purulia and Bankura showcase vibrant folk traditions, music, and community gatherings.";
  }

  else if (
    q.includes("nature") ||
    q.includes("forest") ||
    q.includes("wildlife") ||
    q.includes("tiger") ||
    q.includes("hill") ||
    q.includes("mountain")
  ) {
    answer =
      "Nature lovers should explore the Sundarbans, Darjeeling, and the Dooars region. From mangrove forests and Royal Bengal Tigers to misty mountains, rivers, and tea gardens, these destinations showcase Bengal's incredible natural beauty.";
  }

  else if (
    q.includes("history") ||
    q.includes("heritage") ||
    q.includes("monument") ||
    q.includes("palace") ||
    q.includes("historical")
  ) {
    answer =
      "Murshidabad is one of Bengal's most significant historical destinations. Once the capital of Bengal, it is home to magnificent palaces, mosques, and monuments that reveal fascinating stories from the Nawab era.";
  }

  else if (
    q.includes("art") ||
    q.includes("craft") ||
    q.includes("handicraft")
  ) {
    answer =
      "Bankura and Bishnupur are famous for their artistic heritage. Terracotta temples, handcrafted pottery, traditional music, and local artisan communities make these regions cultural treasures.";
  }

  else if (
    q.includes("tea") ||
    q.includes("darjeeling")
  ) {
    answer =
      "Darjeeling is globally celebrated for its tea gardens, breathtaking Himalayan views, colonial heritage, and vibrant hill culture. A visit combines natural beauty with one of the world's most famous tea traditions.";
  }

  else {
    answer =
      "West Bengal is a land where literature, festivals, cuisine, nature, and history blend together beautifully. From the tea gardens of Darjeeling and the heritage of Murshidabad to the folk traditions of Purulia and the cultural vibrancy of Kolkata, every district has a unique story to tell.";
  }

  return res.status(200).json({
    text: answer,
  });
}
