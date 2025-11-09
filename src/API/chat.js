// api/chat.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      { inputs: `You are a plant expert. Answer clearly and helpfully: ${message}` },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data?.generated_text || "Sorry, I couldn't generate a response.";
    res.status(200).json({ reply: aiText });

  } catch (err) {
    console.error("Error calling Hugging Face:", err.response?.data || err.message);
    res.status(500).json({ error: "AI request failed" });
  }
}
