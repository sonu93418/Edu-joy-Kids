const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "lib", "lesson-data.ts");

// Read the file
const content = fs.readFileSync(filePath, "utf8");

// Remove all lines that match the emoji pattern
const lines = content.split("\n");
const filteredLines = lines.filter((line) => {
  // Match lines like:     emoji: "🔤",
  return !line.match(/^\s+emoji:\s*".*",?\s*$/);
});

// Write back to file
fs.writeFileSync(filePath, filteredLines.join("\n"), "utf8");

console.log("✅ Removed all emoji properties from lesson-data.ts");
