import { twMerge } from "tailwind-merge";

export default function mergeClasses(...inputs: any[]) {
  return twMerge(inputs);
}
