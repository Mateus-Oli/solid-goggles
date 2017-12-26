import { Implementation } from "../model/container";

type GenericFunction<R = any, A = any> = (...args: A[]) => R;
type GenericObject<T extends {[k: string]: any} = {[k: string]: any}> = T;

export function getKeys<T>(obj: T): (keyof T)[];

export function getAllKeys<T>(obj: T): (keyof T)[];

export function getMethods<T>(obj: T): (keyof T)[];

export function isFunctionEquivalent(first: GenericFunction, second: GenericFunction): boolean;

export function isMethodEquivalent<T>(first: GenericFunction, second: GenericFunction): boolean;

export function isObjectMethodEquivalent(first: GenericObject, second: GenericObject): boolean

export function isClassEquivalent(first: Implementation<GenericObject>, second: Implementation<GenericObject>): boolean

export function isPrimitive(value: number): true;
export function isPrimitive(value: string): true;
export function isPrimitive(value: boolean): true;
export function isPrimitive(value: symbol): true;
export function isPrimitive<T extends GenericFunction>(value: T): false;
export function isPrimitive<T extends GenericObject<any>>(value: T): false;
export function isPrimitive<T>(value: T): boolean;

export function isEquivalent(first: any, second: any): boolean;
