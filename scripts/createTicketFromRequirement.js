// scripts/createTicketFromRequirement.js
import readline from "readline";
import { expandRequirement } from "../llm/expander.js";
import { createJiraTicket } from "../jira/ticketCreator.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//requirement = "Notify user when their flight is delayed by more than 15 minutes.";

rl.question("📝 Enter your requirement: ", async (requirement) => {
  try {
    console.log("\n🔍 Expanding requirement...");
    const expanded = await expandRequirement(requirement);

    console.log("📨 Creating Jira ticket...");
    const result = await createJiraTicket(expanded);

    console.log("✅ Done! Ticket created:");
    console.log(result);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    rl.close();
  }
});
