/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 21:08:16 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
