type Primitive = string | number | boolean | symbol;
type Composite = { [index: string]: any } | ((...args) => any);
type Empty = null | undefined;

export function isPrimitive(primitive): primitive is Primitive;
export function isComposite(composite):  composite is Composite;

export function isObject(obj): obj is object;
export function isFunction(func): func is (...args) => any;

export function isSymbol(sym): sym is symbol;
export function isString(str): str is string;
export function isNumber(num): num is number;
export function isBoolean(bool): bool is boolean;

export function isUndefined(undef): undef is undefined;

export function isEmpty(empty): empty is Empty;
export function isNull(nil):  nil is null;

