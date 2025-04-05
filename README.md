# 🧠 Automated Jira Ticket Generator

This project automates the **requirement expansion and Jira ticket creation** process using **Perplexity API** and **Jira API**. It is designed to accelerate the **ideation and testing phases** of the software development lifecycle.

---

## ✨ Features

- ✅ Take a high-level user requirement as input  
- 🤖 Use **Perplexity LLM API** to:
  - Expand into detailed structured requirements  
  - Break it into sub-requirements  
  - Generate test cases and truth cases  
- 🎫 Automatically create a **Jira ticket** with the generated details  
- 💾 Saves Perplexity output locally to avoid redundant API calls  

---

## 📁 Folder Structure

```
AutomatedJiraTicketGen/
├── config/
│   └── config.js                  # Loads environment variables
├── data/
│   └── expanded_requirements.json # Saved Perplexity response
├── llm/
│   ├── expander.js               # Perplexity API wrapper
│   └── prompt_template.txt       # LLM prompt
├── jira/
│   └── ticketCreator.js          # Jira API integration
├── scripts/
│   └── createTicketFromRequirement.js # Main runner script
├── .env                          # Environment variables (excluded from Git)
├── .gitignore
└── package.json
```

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Automated-Jira-Ticket-Generator.git
cd Automated-Jira-Ticket-Generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder:

```env
# Perplexity
PERPLEXITY_API_KEY=your-perplexity-api-key
PERPLEXITY_MODEL=llama-3-sonar-large-32k-online

# Jira
JIRA_API_KEY=your-jira-api-key
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_PROJECT_KEY=FTA
JIRA_USER_EMAIL=your-email@example.com
```

> **Note:** Do not share `.env` publicly.

### 4. Run the Script

```bash
node scripts/createTicketFromRequirement.js
```

You will be prompted to enter a requirement in the terminal. The script will:

- Call the Perplexity API
- Save the output in `data/expanded_requirements.json`
- Create a Jira ticket using the description and sub-requirements

---

## 🛠️ Technologies Used

- Node.js
- Axios
- Dotenv
- Perplexity LLM API
- Atlassian Jira REST API

---

## 📌 Notes

- Only uses existing fields in **Jira Free** (no test management plugin or custom fields needed).
- Test cases and truth cases are not directly added to Jira (but are generated and available in the saved JSON).
- Repeated LLM calls are avoided by caching results in the `data/` folder.

---

## 👨‍💻 Demo Workflow (Visual)

1. **Input**: You enter a high-level requirement.  
2. **Processing**: Perplexity expands it with a detailed breakdown.  
3. **Output**: Jira ticket is created automatically.  
4. **Saved Data**: Expansion is saved locally for reference or debugging.

---

## 📬 Author

Made with ❤️ by [Aashish Singh](https://github.com/<your-username>)
