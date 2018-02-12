import { findImplementation } from "../providers/symbols";

export const implement = inter => impl => {
  (inter || impl)[findImplementation] = impl[findImplementation] = impl;
};
