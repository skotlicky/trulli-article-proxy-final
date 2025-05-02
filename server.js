import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/articles", async (req, res) => {
  const { sectionId } = req.query;

  if (!sectionId) {
    return res.status(400).json({ error: "Missing sectionId" });
  }

  try {
    const response = await fetch(
      `https://trulliaudiosupport.zendesk.com/api/v2/help_center/sections/${sectionId}/articles.json`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ZENDESK_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch articles" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
