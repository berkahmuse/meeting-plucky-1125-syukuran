// The Meeting That Should Have Been an Email.
//
// Entry program: writes one single-line joke (at most 200 characters)
// about a meeting that should have been an email to /output/entry.txt.
//
// The joke: the meeting's whole purpose was to decide who should send
// the email that would have made the meeting unnecessary — the room
// spent its time assigning the job of replacing itself. One sentence;
// the turn lands on the final words.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "We spent forty-five minutes deciding who should send the email that would have replaced the meeting.";

const MAX_CHARS = 200;

function checkEntry(line: string): string {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, must be 1-${MAX_CHARS}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return line;
}

function main(): void {
  const line = checkEntry(ENTRY_LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
