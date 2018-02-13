import { findImplementation } from "../providers/symbols";

export const implement = inter => impl => {
  Object(inter || impl)[findImplementation] = Object(impl)[findImplementation] = impl;
};
