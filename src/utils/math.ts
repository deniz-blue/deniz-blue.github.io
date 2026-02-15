export const randInt = (x = 1) => Math.round(Math.random() * x);
export const randIntBetween = (min: number, max: number) => randInt(max-min)+min;
export const randFloat = (x = 1) => Math.random() * x;
export const choose = <T,>(a: T, b: T) => Math.random() > 0.5 ? a : b;
export const randArr = <T,>(x: T[]) => x[randInt(x.length-1)];
export const toRadians = (degrees: number) => degrees * (Math.PI/180);
export const clamp = (min: number, mid: number, max: number) => Math.min(Math.max(min, mid), max);
export const lerp = (a: number, b: number, amt: number) => a + (b - a) * amt;
