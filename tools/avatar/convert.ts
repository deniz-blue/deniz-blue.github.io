import { readFile, writeFile } from "node:fs/promises";
import type { PeekingAvatarAnimations } from "~/avatar/types";
import { parseBlockbenchModel } from "./blockbench.ts";
import { convertPeekingAvatar, peekingAvatarAnimations } from "./peekingAvatar.ts";

const OUTPUT = new URL("../../src/assets/avatar/peeking-avatar.json", import.meta.url);
const ANIMATIONS_OUTPUT = new URL("../../src/assets/avatar/peekingAvatarAnimations.ts", import.meta.url);

const json = (value: unknown) => JSON.stringify(value, undefined, "\t");

const animationsModule = (animations: PeekingAvatarAnimations) =>
	`import type { PeekingAvatarAnimations } from "~/avatar/types";\n\nexport const PEEKING_AVATAR_ANIMATIONS: PeekingAvatarAnimations = ${json(animations)};\n`;

const write = async (url: URL, contents: string) => {
	await writeFile(url, contents);
	console.log(`wrote ${url.pathname}`);
};

const [source] = process.argv.slice(2);
if (!source) {
	console.error("usage: pnpm convert-avatar <model.bbmodel>");
	process.exit(1);
}

const model = parseBlockbenchModel(await readFile(source, "utf8"));
await write(OUTPUT, `${json(await convertPeekingAvatar(model))}\n`);
await write(ANIMATIONS_OUTPUT, animationsModule(peekingAvatarAnimations(model)));
