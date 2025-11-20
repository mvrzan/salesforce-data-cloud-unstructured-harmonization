import sfAuthToken from "../utils/authToken.js";
import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const getHudmo = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🗂️ - getHudmo - Request received...`);

    const hudmoName = req.body.hudmoName;
    const dccid = req.body.dccid;

    console.log(`${getCurrentTimestamp()} 🔑 - getHudmo - HUDMO: ${hudmoName}, DCCID: ${dccid}`);

    const { accessToken } = await sfAuthToken();

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(`${getCurrentTimestamp()} 🤖 - getHudmo - Sending Agentforce message...`);

    const response = await fetch(
      `${process.env.SALESFORCE_LOGIN_URL}/services/data/v64.0/ssot/v1/ek/hudmo/${hudmoName}/${dccid}`,
      config
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${getCurrentTimestamp()} ❌ - getHudmo - API Error: ${response.status} ${response.statusText}`);
      console.error(`${getCurrentTimestamp()} ❌ - getHudmo - Response: ${errorText}`);
      throw new Error(`There was an error while sending the Agentforce message: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.attributes && data.attributes.content) {
      data.attributes.content = data.attributes.content
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");
    }

    console.log(`${getCurrentTimestamp()} ✅ - getHudmo - Message sent!`);

    res.status(200).json({ data });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getHudmo - Error occurred: ${error.message}`);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getHudmo;
