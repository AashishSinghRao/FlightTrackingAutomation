import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  JIRA_API_KEY: process.env.JIRA_API_KEY,
  JIRA_BASE_URL: process.env.JIRA_BASE_URL,
  JIRA_PROJECT_KEY: process.env.JIRA_PROJECT_KEY,
  JIRA_USER_EMAIL: process.env.JIRA_USER_EMAIL,
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4",
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
  PERPLEXITY_API_URL: process.env.PERPLEXITY_API_URL,
  PERPLEXITY_MODEL: process.env.PERPLEXITY_MODEL || "sonar-pro",
};

export default config;
  