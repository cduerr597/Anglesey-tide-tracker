export default async function handler(req, res) {
  const { station = '0480', duration = 7 } = req.query;
  const apiKey = process.env.ADMIRALTY_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key not configured' });
  }

  try {
    const url = `https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/${station}/TidalEvents?duration=${duration}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
