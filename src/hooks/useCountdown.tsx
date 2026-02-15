import { useLanguage } from "@alan404/react-localization";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

export const relativeString = (
    d: Date,
    locales?: Intl.LocalesArgument,
) => {
    let formatter = new Intl.RelativeTimeFormat(locales);
    const diff = -((new Date().getTime() - d.getTime()) / 1000) | 0;
    const absDiff = Math.abs(diff);
    let f: { duration: number; unit: any };
    if (absDiff > 86400 * 30 * 10) {
        f = { duration: Math.round(diff / (86400 * 365)), unit: 'years' };
    } else if (absDiff > 86400 * 25) {
        f = { duration: Math.round(diff / (86400 * 30)), unit: 'months' };
    } else if (absDiff > 3600 * 21) {
        f = { duration: Math.round(diff / 86400), unit: 'days' };
    } else if (absDiff > 60 * 44) {
        f = { duration: Math.round(diff / 3600), unit: 'hours' };
    } else if (absDiff > 30) {
        f = { duration: Math.round(diff / 60), unit: 'minutes' };
    } else {
        f = { duration: diff, unit: 'seconds' };
    }
    return formatter.format(f.duration, f.unit)
};

export const useCountdown = ({
    countdownTime,
    update: customUpdate,
    locale,
}: {
    countdownTime: Date;
    update?: () => void;
    locale?: string;
}) => {
    const { language } = useLanguage();
    const [timerText, setTimer] = useState("--:--:--:--");
    const [relativeText, setRelative] = useState("");
    const [countdownReached, setCountdownReached] = useState(new Date() > countdownTime);

    const update = () => {
        const date = new Date();
        let passed = date.getTime() > countdownTime.getTime();
        setCountdownReached(passed);

        let diff = Math.round(Math.abs(date.getTime() - countdownTime.getTime()) / 1000);

        const d = Math.floor((diff) / (60 * 60 * 24));
        const h = Math.floor((diff) / (60 * 60)) % 24;
        const m = Math.floor(diff / 60) % 60;
        const s = diff % 60;

        setTimer((
            !d ? (!h ? (!m ? [s] : [m,s]) : [h,m,s]) : ([d,h,m,s])
        ).map(x => x.toString().padStart(2, "0")).join(":"));

        setRelative(relativeString(countdownTime, locale || language))

        customUpdate?.();
    };

    useEffect(() => {
        update();
        let i = setInterval(update, 300);
        return () => {
            clearInterval(i);
        };
    }, []);


    return {
        countdownReached,
        timerText,
        relativeText,
    };
};
