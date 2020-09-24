export type AnyClass = new (...args: any[]) => any;
export type Class<T> = new (...args: any[]) => T;
