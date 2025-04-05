import axios from "axios";
import dotenv from "dotenv";
import { formatADFText } from "../utils/formatADF.js";

dotenv.config();

const {
  JIRA_API_KEY,
  JIRA_BASE_URL,
  JIRA_PROJECT_KEY,
  JIRA_USER_EMAIL
} = process.env;

export async function createJiraTicket(perplexityResponse) {
  try {
    const {
      title,
      description,
      sub_requirements = [],
      test_cases = [],
      truth_cases = []
    } = perplexityResponse;

    // Format the full description with sub-requirements and test cases
    const fullDescription = `
${description}

--- Sub-Requirements ---
${sub_requirements.map((req, i) => `${i + 1}. ${req}`).join("\n")}

--- Test Cases ---
${test_cases.map((tc, i) => `${i + 1}. ${tc}`).join("\n")}

--- Truth Cases ---
${truth_cases.map((tc, i) => `${i + 1}. ${tc}`).join("\n")}
    `;

    const issueData = {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary: title,
        description: formatADFText(fullDescription), // ⬅️ formatted ADF!
        issuetype: { name: "Task" }
      }
    };

    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/issue`,
      issueData,
      {
        headers: {
          "Authorization": `Basic ${Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_KEY}`).toString("base64")}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Jira ticket created successfully!");
    console.log(`🔗 Ticket URL: ${JIRA_BASE_URL}/browse/${response.data.key}`);
    return response.data;
  } catch (err) {
    console.error("❌ Jira ticket creation failed:", err.response?.data || err.message);
    throw err;
  }
}
