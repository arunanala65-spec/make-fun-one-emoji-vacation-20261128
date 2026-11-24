// One Emoji, One Dream Vacation — make.fun entry
// A single emoji standing in for the trip of your dreams:
// a sunrise over the sea — the first morning of a holiday,
// warm light on the water, nowhere to be but here.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "🌅";

// Gate: the entry must be exactly one emoji — one grapheme cluster,
// no text, no spaces, nothing else. A lone sunrise over the sea:
// the first morning of a holiday, warm light on the water,
// nowhere to be but here.
const graphemes = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(line)];
if (
  graphemes.length !== 1 ||
  line.trim() !== line ||
  /\s/u.test(line) ||
  !/^\p{Extended_Pictographic}$/u.test(line)
) {
  throw new Error(`entry must be exactly one emoji, got: ${JSON.stringify(line)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
