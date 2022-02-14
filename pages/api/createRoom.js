export default async function handler(req, res) {
  const { privacy, expiryMinutes, ...rest } = req.body;

  if (req.method === 'POST') {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
    }

    const room_url = `${process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'}/rooms`;
    const room_info = await fetch(room_url + "/" + req?.body?.name, { headers: header });
    const { name, url, error } = await room_info.json();
    console.log("Room Url:",{ name, url, error });

    if (error) {
      console.log("Existing room not found, creating new one...");
      const request = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          name: req?.body?.name,
          privacy: 'private',
          properties: {
            exp: Math.round(Date.now() / 1000) + (expiryMinutes || 5) * 60, // expire in x minutes
            eject_at_room_exp: true,
            enable_knocking: true,
            enable_prejoin_ui:false,
            signaling_impl:'ws',
            autojoin: true,
            max_participants: 5,
            enable_screenshare:false,
            enable_chat:false,
          },
        }),
      };

      console.log("Request:", request);

      const response = await fetch(room_url, request);
      const { name, url, error } = await response.json();

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ name: name, url: url, domain: room_url });
    }
    else {
      return res.status(200).json({ name: name, url: url, domain: room_url });
    }
  }
  return res.status(500);
}
