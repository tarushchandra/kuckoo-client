import { twMerge } from "tailwind-merge";

export default function mergeClasses(...inputs) {
  return twMerge(inputs);
}
