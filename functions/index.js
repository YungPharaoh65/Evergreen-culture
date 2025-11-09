import * as functions from "firebase-functions";
import axios from "axios";

export const getAIResponse = functions.https.onRequest(async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Make POST request to Hugging Face Inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      { inputs: `You are a plant expert. Answer clearly and helpfully: ${userMessage}` },
      {
        headers: {
          Authorization: `Bearer ${functions.config().huggingface.key}`, // ✅ safe
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data?.generated_text || "Sorry, I couldn't generate a response.";
    return res.status(200).json({ reply: aiText });

  } catch (error) {
    console.error("Error in AI function:", error.response?.data || error.message);
    return res.status(500).json({ error: "AI request failed" });
  }
});
