export default async function handler(req, res) {
    const { sectionId } = req.query;
  
    if (!sectionId) {
      return res.status(400).json({ error: "Missing sectionId" });
    }
  
    const response = await fetch(
      `https://trulliaudiosupport.zendesk.com/api/v2/help_center/sections/${sectionId}/articles.json`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ZENDESK_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch articles" });
    }
  
    const data = await response.json();
    res.status(200).json(data);
  }
  