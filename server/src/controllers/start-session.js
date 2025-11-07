import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import sfAuthToken from "../utils/authToken.js";
import { randomUUID } from "crypto";

const startSession = async (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 📥 - startSession - Request received...`);

    const { accessToken, instanceUrl } = await sfAuthToken();
    const agentId = process.env.AGENTFORCE_AGENT_ID || "";
    const UUID = randomUUID();

    const body = {
      externalSessionKey: UUID,
      instanceConfig: {
        endpoint: process.env.SALESFORCE_LOGIN_URL,
      },
      streamingCapabilities: {
        chunkTypes: ["Text"],
      },
      bypassUser: true,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    };

    console.log(`${getCurrentTimestamp()} 🤖 - startSession - Retrieving Agentforce chat messages...`);

    const response = await fetch(`https://api.salesforce.com/einstein/ai-agent/v1/agents/${agentId}/sessions`, config);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `${getCurrentTimestamp()} ❌ - startSession - API Error: ${response.status} ${response.statusText}`
      );
      console.error(`${getCurrentTimestamp()} ❌ - startSession - Response: ${errorText}`);
      throw new Error(`There was an error while getting the Agentforce messages: ${response.statusText}`);
    }

    const data = await response.json();

    res.status(200).json({
      accessToken,
      instanceUrl,
      data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - startSession - Error occurred: ${error.message}`);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default startSession;
