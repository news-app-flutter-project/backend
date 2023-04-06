import path from "path";

function myLog(message: string) {
  const stackTrace = new Error().stack!;
  const stackLines = stackTrace.split("\n").map((line) => line.trim());
  const tsLine = stackLines.find(
    (line) => line.includes(".ts:") && !line.includes("node_modules")
  );
  if (tsLine) {
    const filePath = tsLine.split(" ").slice(-1)[0];
    const fileName = path.basename(filePath);
    const lineNumber = tsLine.split(":").slice(-2)[0];
    console.log(`${fileName}:${lineNumber} - ${message}`);
  } else {
    console.log(`[unknown] - ${message}`);
  }
}

export default myLog;
