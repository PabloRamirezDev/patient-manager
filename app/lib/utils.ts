import { NextRequest } from "next/server";
import { letterOnlyRegex } from "./regex";

export const isLetterOnly = (str: string) => {
  const trimmedStr = str.trim();

  return letterOnlyRegex.test(trimmedStr);
};

export const getSearch = (req: NextRequest) => {
  const { url } = req;

  const searchParams = new URL(url).searchParams;

  const searchObj: { [k: string]: string } = {};

  searchParams.forEach((value, key) => {
    searchObj[key] = value;
  });

  return searchObj;
};
