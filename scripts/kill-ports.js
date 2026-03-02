/**
 * Cross-platform port killer for dev startup.
 * Kills any processes on ports 3000 and 3001 before dev servers start.
 */
const { execSync } = require("child_process");
const os = require("os");

const PORTS = [3000, 3001];

function killPort(port) {
  try {
    if (os.platform() === "win32") {
      // Get netstat output and find LISTENING processes on this port
      const output = execSync("netstat -ano", { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
      const lines = output.split("\n").filter(
        (l) => l.includes(":" + port + " ") || l.includes(":" + port + "\t") || l.includes(":" + port + "\r"),
      );
      const pids = new Set();
      for (const line of lines) {
        if (line.includes("LISTENING") || line.includes("ESTABLISHED")) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1].trim();
          if (pid && pid !== "0" && /^\d+$/.test(pid)) pids.add(pid);
        }
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          console.log(`  Killed PID ${pid} on port ${port}`);
        } catch (_) {}
      }
    } else {
      // Unix/Mac
      try {
        execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, { stdio: "ignore" });
      } catch (_) {}
    }
  } catch (_) {
    // Port was free, no action needed
  }
}

console.log("🔧 Clearing dev ports...");
for (const port of PORTS) {
  killPort(port);
}
console.log("✅ Ports cleared — starting dev servers\n");
