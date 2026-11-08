import { readFile, writeFile } from "node:fs/promises";
import type { AvatarAnimations } from "~/scripts/avatar/types";
import { parseBlockbenchModel } from "./blockbench.ts";
import { convertAvatar, avatarAnimations } from "./avatar.ts";

const OUTPUT = new URL("../../src/assets/avatar/avatar.json", import.meta.url);
const ANIMATIONS_OUTPUT = new URL("../../src/assets/avatar/avatarAnimations.ts", import.meta.url);

const json = (value: unknown) => JSON.stringify(value, undefined, "\t");

const animationsModule = (animations: AvatarAnimations) =>
	`import type { AvatarAnimations } from "~/scripts/avatar/types";\n\nexport const AVATAR_ANIMATIONS: AvatarAnimations = ${json(animations)};\n`;

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
await write(OUTPUT, `${json(await convertAvatar(model))}\n`);
await write(ANIMATIONS_OUTPUT, animationsModule(avatarAnimations(model)));
