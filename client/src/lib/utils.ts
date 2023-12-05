import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";
import { Tables } from "@/types/common";

const localUrl = "http://localhost:3000/api/v1";
// const localUrl = "/api/v1";
// const prodUrl = process.env.REACT_APP_API_URL;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetch = axios.create({
  baseURL: localUrl,

  // Only if there is a cookie
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const identifyMutation = (
  from: Tables,
  data: TDataFields
): TDataFields => {
  if (from && data) {
    if (from === "employees") return { ...data, age: Number(data.age) };
    if (from === "designations")
      return { ...data, salary: Number(data.salary) };
  }
  return data;
};
