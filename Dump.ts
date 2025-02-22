// import express from "express";
// import axios from "axios";

// const app = express();
// app.use(express.json());

// app.post("/chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Call Ollama API
//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "deepseek-coder:1.5b",
//       prompt: prompt,
//       stream: false, // Set to true if you want streaming
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to generate response" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
