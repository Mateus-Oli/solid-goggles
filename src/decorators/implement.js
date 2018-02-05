import { getImplementation } from "../providers/symbols";

export const implement = inter => impl => {
  inter[getImplementation] = impl[getImplementation] = impl;
};
