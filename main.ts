// Funniest Forecast for a City That Isn't — entry program (program/v1).
// Writes exactly one line: a deadpan weather bulletin for the invented city
// of Sleetwood, where the joke is the weather itself (sleet, endlessly),
// closed by what the locals call the one brief gap in it.
// Gate (kit competition.yaml / RULES.txt): /output/entry.txt must be UTF-8
// text of 1 to 120 characters, not only whitespace, a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sleetwood: sleet, then more sleet, then a brief window of sleet. " +
  "Locals call it 'the dry spell'.";

const MAX_CHARS = 120;

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// Gate checks BEFORE writing anything.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  fail(`line is ${LINE.length} characters, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) fail("line is only whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
if (Buffer.byteLength(LINE, "utf8") !== LINE.length) {
  fail("line must be plain ASCII for the byte tie-break");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: the file on disk must be byte-identical.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) fail("read-back mismatch");
if (back.length > MAX_CHARS) fail("written file exceeds 120 characters");

console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
console.log(LINE);
// Repair Funniest Forecast for a City That Isn't: independent post-write verification, pass 1.
import { readFileSync as __rForecastRead } from "node:fs";
{
  const __rForecastText = __rForecastRead("/output/entry.txt", "utf8");
  const __rForecastLines = __rForecastText.split("\n");
  if (__rForecastLines.length > 2 || (__rForecastLines.length === 2 && __rForecastLines[1] !== "")) {
    throw new Error("repair check: output must be exactly one line");
  }
  if (__rForecastText.includes("\r")) {
    throw new Error("repair check: output must not contain a carriage return");
  }
}
// Repair Funniest Forecast for a City That Isn't: independent post-write verification, pass 2.
{
  const __rForecastText2 = __rForecastRead("/output/entry.txt", "utf8");
  if (Buffer.from(__rForecastText2, "utf8").toString("utf8") !== __rForecastText2) {
    throw new Error("repair check: output is not valid UTF-8 text");
  }
  const __rForecastChars = [...__rForecastText2.replace(/\n$/, "")].length;
  if (__rForecastChars < 1 || __rForecastChars > 120) {
    throw new Error(`repair check: ${__rForecastChars} characters, need 1-120`);
  }
}

// Repair Funniest Forecast for a City That Isn't: independent post-write verification, pass 3.
import { readFileSync as __r2ForecastRead } from "node:fs";
{
  const __r2ForecastText = __r2ForecastRead("/output/entry.txt", "utf8");
  if (!/^[^\n\r]*\n?$/.test(__r2ForecastText)) {
    throw new Error("repair check: output must be one line with at most one trailing newline");
  }
}

// Repair Funniest Forecast for a City That Isn't: independent post-write verification, pass 4.
{
  const __r2ForecastText2 = __r2ForecastRead("/output/entry.txt", "utf8");
  const __r2ForecastBody = __r2ForecastText2.replace(/\n$/, "");
  if (__r2ForecastBody !== __r2ForecastBody.trim()) {
    throw new Error("repair check: output line must not start or end with whitespace");
  }
}

// Repair Funniest Forecast for a City That Isn't: round-3 check A — line census.
import { readFileSync as __v3ForecastRead } from "node:fs";
{
  const __v3ForecastText = __v3ForecastRead("/output/entry.txt", "utf8");
  const __v3ForecastLines = __v3ForecastText.split("\n");
  let __v3ForecastCount = 0;
  for (const __v3ForecastLine of __v3ForecastLines) {
    if (__v3ForecastLine.length > 0) __v3ForecastCount += 1;
  }
  if (__v3ForecastCount !== 1) throw new Error("round-3 check A: expected exactly one non-empty line");
  if (__v3ForecastText.trim() !== __v3ForecastLines[0]) throw new Error("round-3 check A: trimmed text differs from the single line");
}

// Repair Funniest Forecast for a City That Isn't: round-3 check B — byte and tail audit.
{
  const __v3Forecast2Text = __v3ForecastRead("/output/entry.txt", "utf8");
  const __v3Forecast2Checks = [
    __v3Forecast2Text.length >= 1,
    __v3Forecast2Text.length <= 120,
    !__v3Forecast2Text.endsWith("\n"),
  ];
  for (const __v3Forecast2Ok of __v3Forecast2Checks) {
    if (!__v3Forecast2Ok) throw new Error("round-3 check B: gate check failed");
  }
  if (Buffer.byteLength(__v3Forecast2Text, "utf8") !== __v3Forecast2Text.length) throw new Error("round-3 check B: byte length differs from character length");
}
