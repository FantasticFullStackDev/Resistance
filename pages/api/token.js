/*
 * This is an example server-side function that generates a meeting token
 * server-side. You could replace this on your own back-end to include
 * custom user authentication, etc.
 */
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { roomName, userName, userId, isOwner } = req.body;
  const session = await getSession({ req });
  console.log("Room Properties:");
  console.log(roomName, userName, userId, isOwner);

  if (req.method === 'POST' && roomName) {
    console.log(`Getting token for room '${roomName}' as owner: ${isOwner}`);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_name: userName,
          is_owner: isOwner,
          eject_at_token_exp: false,
          user_id: userId,
          enable_screenshare:false,
          start_video_off: true,
          start_audio_off: true,
        },
      }),
    };

    const dailyRes = await fetch(`${process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'}/meeting-tokens`, options);
    const { token, error } = await dailyRes.json();
    console.log("Token from ##: ", dailyRes);

    if (error) {
      return res.status(500).json({ error });
    }

    session.daily = token;
    console.log(req.session);

    return res.status(200).json({ token: token, domain: process.env.DAILY_DOMAIN });
  }

  return res.status(500);
}
