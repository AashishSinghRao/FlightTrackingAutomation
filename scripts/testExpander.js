import { expandRequirement } from "../llm/expander.js";

// Sample input requirement
const requirement = "Notify users of flight delays in real time";

async function test() {
  try {
    const result = await expandRequirement(requirement);

    console.log("\n🎯 Title:");
    console.log(result.title);

    console.log("\n📝 Description:");
    console.log(result.description);

    console.log("\n📌 Sub-requirements:");
    result.sub_requirements.forEach((sr, i) => console.log(`${i + 1}. ${sr}`));

    console.log("\n✅ Test Cases:");
    result.test_cases.forEach((tc, i) => console.log(`TC${i + 1}: ${tc}`));
  } catch (err) {
    console.error("Error during expansion test:", err.message);
  }
}

test();
