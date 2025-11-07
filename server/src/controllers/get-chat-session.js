import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import sfAuthToken from "../utils/authToken.js";

const getChatSession = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 📥 - getChatSession - Request received...`);

    const { accessToken, instanceUrl } = await sfAuthToken();

    res.status(200).json({
      accessToken,
      instanceUrl,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getChatSession - Error occurred: ${error.message}`);
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getChatSession;
