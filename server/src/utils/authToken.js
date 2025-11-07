import { getCurrentTimestamp } from "./loggingUtil.js";

const sfAuthToken = async () => {
  try {
    console.error(`${getCurrentTimestamp()} 🧰 - sfAuthToken - Requesting Salesforce access token...`);

    const clientId = process.env.CLIENT_ID || "";
    const clientSecret = process.env.CLIENT_SECRET || "";

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }).toString();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    };

    const response = await fetch(`${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`There was an error while getting the Salesforce Access Token: ${response.statusText}`);
    }

    console.error(`${getCurrentTimestamp()} ✅ - sfAuthToken - Successfully provided!`);

    return { accessToken: data.access_token, instanceUrl: data.instance_url };
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - sfAuthToken - Error occurred: ${error.message}`);
    return error;
  }
};

export default sfAuthToken;
