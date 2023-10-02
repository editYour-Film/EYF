const lerp = (start:number, end:number, amt:number) => (1 - amt) * start + amt * end;
const map = (a:number, b:number, A:number, B:number, x:number) => (x - a) * ((B - A) / (b - a)) + A;
const clamp = (min:number, max:number, value:number) => (value < min ? min : value > max ? max : value);

export {lerp, map, clamp}