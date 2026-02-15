import { useTerminalStore } from "../store/useTerminalStore";

export const SEPERATOR = "/";
export const CURRENT_DIR = ".";
export const PARENT_DIR = "..";
export const HOME_DIR = "~";

export class Path {
	constructor(public readonly path: string) { }
	toString = () => this.path;
	toJSON = () => this.path;

	static home() {
		const homePath = useTerminalStore.getState().env.HOME || ("/home/" + useTerminalStore.getState().username);
		return new Path(homePath);
	}

	static root() {
		return new Path(SEPERATOR);
	}

	static cwd() {
		return useTerminalStore.getState().cwd;
	}

	static fromSegments(segments: string[]) {
		return new Path(segments.join(SEPERATOR));
	}

	// Resolves  . and .. segments
	normalize(): Path {
		const parts = this.path.split(SEPERATOR).filter(part => part && part !== CURRENT_DIR);
		const stack: string[] = [];
		for (const part of parts) {
			if (part === PARENT_DIR) {
				if (stack.length > 0) {
					stack.pop();
				}
			} else if (part !== "") {
				stack.push(part);
			}
		}
		return new Path(((this.path.startsWith(SEPERATOR) ? SEPERATOR : "") + stack.join(SEPERATOR)) || SEPERATOR);
	}

	absolute(cwd: Path = useTerminalStore.getState().cwd) {
		if (this.path.startsWith(SEPERATOR)) {
			return this.normalize();
		} else if (this.path.startsWith(HOME_DIR)) {
			const relativePart = this.path.slice(HOME_DIR.length);
			return Path.home().join(relativePart).normalize();
		} else {
			return new Path(cwd.path).join(this.path).normalize();
		}
	}

	// /home/user/docs -> ~/docs
	shorten() {
		if (this.path.startsWith(Path.home().path)) {
			const relativePart = this.path.slice(Path.home().path.length + 1);
			return new Path(HOME_DIR).join(relativePart).normalize();
		}

		return this;
	}

	relativeTo(base: Path): Path {
		const from = base.normalize().segments();
		const to = this.normalize().segments();

		let i = 0;
		while (i < from.length && i < to.length && from[i] === to[i]) i++;
		const upMoves = from.length - i;
		const downMoves = to.slice(i);
		let ret = [
			...Array(upMoves).fill(PARENT_DIR),
			...downMoves,
		].join(SEPERATOR);
		if (!ret) ret = CURRENT_DIR;
		return new Path(ret);
	}

	join(subPath: string): Path {
		return new Path(this.path + SEPERATOR + subPath);
	}

	segments(): string[] {
		return this.normalize().path.split(SEPERATOR).filter(part => part);
	}

	lastSegment(): string {
		const segments = this.segments();
		return segments[segments.length - 1] || "";
	}

	parent(): Path {
		const segments = this.segments();
		if (segments.length === 0) return this;
		return Path.fromSegments(segments.slice(0, -1));
	}
};
