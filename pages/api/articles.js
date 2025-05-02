export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
  
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
        return res.status(response.status).json({ error: "Failed to fetch articles" });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  