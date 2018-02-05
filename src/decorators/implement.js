import { getImplementation } from "../providers/symbols";

export const implement = inter => impl => {
  (inter || impl)[getImplementation] = impl[getImplementation] = impl;
};
