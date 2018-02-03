import { Implementation, Interface } from "../models/container";

export function implementation<T>(impl: Implementation<T>): (target: Interface<T>) => void;
