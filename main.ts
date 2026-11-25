// The Meeting That Should Have Been an Email.
//
// Entry program: writes one single-line joke (at most 200 characters)
// about a meeting that should have been an email to /output/entry.txt.
//
// The joke: the meeting's whole purpose was to decide who should send
// the email that would have made the meeting unnecessary — the room
// spent its time assigning the job of replacing itself. One sentence;
// the turn lands on the final words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry is fixed text: three phrase parts joined with single
// spaces. The assembled line is the entry verbatim — no trailing
// newline, no reformatting at runtime.
const ENTRY_PARTS = [
  "We spent forty-five minutes",
  "deciding who should send the email",
  "that would have replaced the meeting.",
] as const;

const ENTRY_LINE = ENTRY_PARTS.join(" ");

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function checkEntry(line: string): string {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
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

// Round-trip guard: the file on disk must be byte-identical to the
// validated line. If the write ever truncated or reformatted the
// entry, fail loudly instead of submitting a wrong file.
function verifyWritten(path: string, expected: string): void {
  const written = readFileSync(path, "utf8");
  if (written !== expected) {
    throw new Error(
      `written entry differs from validated entry (${written.length} vs ${expected.length} chars)`,
    );
  }
}

function main(): void {
  const line = checkEntry(ENTRY_LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  verifyWritten(OUTPUT_PATH, line);
}

main();
