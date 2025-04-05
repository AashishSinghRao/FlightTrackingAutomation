import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import config from "../config/config.js";
import dotenv from "dotenv";
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load prompt template
const promptTemplate = fs.readFileSync(path.join(__dirname, "prompt_template.txt"), "utf-8");

export async function expandRequirement(requirementText) {
  try {
    const response = await axios.post(
      `${config.PERPLEXITY_API_URL}/chat/completions`,
      {
        model: config.PERPLEXITY_MODEL,
        messages: [
          {
            role: "system",
            content: promptTemplate,
          },
          {
            role: "user",
            content: `Requirement: ${requirementText}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${config.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const completion = response.data.choices[0].message.content;

    // Clean up Perplexity markdown formatting
    const cleanJson = completion
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanJson);
    return result;

  } catch (error) {
    console.error("❌ Error from Perplexity:", error.response?.data || error.message);
    throw error;
  }
}


const saveDir = './data';
// Check id data directory exists, if not create it
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir);
}

export async function getOrFetchExpandedRequirement(requirement) {
  const slug = requirement.slice(0, 30).replace(/\s+/g, '_'); // simple slug
  const filePath = path.join(saveDir, `${slug}.json`);

  // Check if already saved
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }

  // Else call Perplexity
  const result = await expandRequirementWithPerplexity(requirement);
  
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
  return result;
}
