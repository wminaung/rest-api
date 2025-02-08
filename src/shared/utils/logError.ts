import fs from "fs";
import path from "path";
import { BaseError } from "../errors";

const logFilePath = path.join(process.cwd(), "error.log");

function logError(error: Error | unknown | any | BaseError): void {
  const logMessage = `${new Date().toISOString()} : ${error.name}\nError: ${
    error.message
  } | status : ${error?.status || null} | code: ${
    error?.code || null
  } \nStack: ${error.stack}\n\n \n\n \n\n \n\n `;

  fs.appendFile(logFilePath, logMessage, "utf8", (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
  console.error(logMessage);
}

export { logError };
