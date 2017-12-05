import { Implementation } from "../model/container";

type GenericFunction<R = any, A = any> = (...args: A[]) => R;
type GenericObject<V = any, K extends string = string> = {[k: K]: V};

export function getKeys<T>(obj: T): (keyof T)[];

export function getAllKeys<T>(obj: T): (keyof T)[];

export function getMethods<T>(obj: T): (keyof T)[];

export function isFunctionEquivalent(first: GenericFunction, second: GenericFunction): boolean;

export function isMethodEquivalent<T>(first: GenericFunction, second: GenericFunction): boolean;

export function isObjectMethodEquivalent(first: GenericObject, second: GenericObject): boolean

export function isClassEquivalent(first: Implementation<GenericObject>, second: Implementation<GenericObject>): boolean
