const MY_TIME_ZONE = "Europe/Vilnius";

const clockFormat = new Intl.DateTimeFormat("en-GB", {
	timeZone: MY_TIME_ZONE,
	hour: "2-digit",
	minute: "2-digit",
	timeZoneName: "shortOffset",
});

const offsetFormat = new Intl.DateTimeFormat("en-GB", {
	timeZone: MY_TIME_ZONE,
	timeZoneName: "longOffset",
});

const clockPart = (date: Date, type: Intl.DateTimeFormatPartTypes) =>
	clockFormat.formatToParts(date).find((it) => it.type === type)?.value;

export const describeMyUtcOffset = (date: Date) =>
	clockPart(date, "timeZoneName")?.replace("GMT", "UTC");

export const describeMyLocalTime = (date: Date) =>
	`${clockPart(date, "hour")}:${clockPart(date, "minute")} for me (${describeMyUtcOffset(date)})`;

const myUtcOffsetMinutes = (date: Date) => {
	const offset =
		offsetFormat.formatToParts(date).find((it) => it.type === "timeZoneName")?.value ?? "";
	const match = /([+-])(\d{2}):(\d{2})/.exec(offset);
	if (!match) return 0;
	const [, sign, hours, minutes] = match;
	return (sign === "-" ? -1 : 1) * (Number(hours) * 60 + Number(minutes));
};

const formatHoursAndMinutes = (totalMinutes: number) => {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	if (minutes === 0) return `${hours}h`;
	if (hours === 0) return `${minutes}m`;
	return `${hours}h ${minutes}m`;
};

export const describeDifferenceFromVisitor = (date: Date) => {
	const difference = myUtcOffsetMinutes(date) + date.getTimezoneOffset();
	if (difference === 0) return "same as you";
	const amount = formatHoursAndMinutes(Math.abs(difference));
	return difference > 0 ? `${amount} ahead of you` : `${amount} behind you`;
};

export const millisecondsToNextMinute = (date: Date) => 60_000 - (date.getTime() % 60_000);
