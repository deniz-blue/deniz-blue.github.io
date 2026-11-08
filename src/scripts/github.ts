type ContributionDay = { date: string; level: number };
type ContributionYear = { year: number; days: ContributionDay[] };

const USER = "deniz-blue";
const FIRST_YEAR = 2023;
const REQUEST_TIMEOUT_MS = 5_000;
const CACHE_MS = 10 * 60_000;

const today = () => new Date().toISOString().slice(0, 10);

const shownYears = () =>
	Array.from(
		{ length: new Date().getUTCFullYear() - FIRST_YEAR + 1 },
		(_, index) => FIRST_YEAR + index,
	);

const fetchTextOrUndefined = async (url: string) => {
	try {
		const response = await fetch(url, {
			headers: { "User-Agent": "deniz.blue" },
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});
		return response.ok ? await response.text() : undefined;
	} catch {
		return undefined;
	}
};

// GitHub serves the profile contribution graph as an HTML fragment; there is no public JSON for it without a token.
const fetchContributionsIn = async (year: number): Promise<ContributionDay[] | undefined> => {
	const html = await fetchTextOrUndefined(
		`https://github.com/users/${USER}/contributions?from=${year}-01-01&to=${year}-12-31`,
	);
	return html === undefined
		? undefined
		: [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g)]
				.map(([, date, level]) => ({ date: date!, level: Number(level) }))
				.filter(({ date }) => date <= today())
				.sort((a, b) => a.date.localeCompare(b.date));
};

const fetchAllContributionYears = async (): Promise<ContributionYear[] | undefined> => {
	const contributions = await Promise.all(
		shownYears().map(async (year) => ({ year, days: await fetchContributionsIn(year) })),
	);
	const loaded = contributions.filter((year): year is ContributionYear => year.days !== undefined);
	return loaded.length === contributions.length
		? loaded.filter(({ days }) => days.length > 0)
		: undefined;
};

let cachedYears: { fetchedAt: number; years: Promise<ContributionYear[] | undefined> } | undefined;

// astro dev renders the page again on every request.
export const fetchContributionYears = () => {
	if (!cachedYears || Date.now() - cachedYears.fetchedAt > CACHE_MS)
		cachedYears = { fetchedAt: Date.now(), years: fetchAllContributionYears() };
	return cachedYears.years;
};

const datesIn = (year: number) =>
	Array.from({ length: 366 }, (_, index) =>
		new Date(Date.UTC(year, 0, 1 + index)).toISOString().slice(0, 10),
	).filter((date) => date.startsWith(`${year}-`) && date <= today());

export const emptyContributionYears = (): ContributionYear[] =>
	shownYears().map((year) => ({ year, days: datesIn(year).map((date) => ({ date, level: 0 })) }));
