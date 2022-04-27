/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 07:07:03 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export enum TAB_TYPE {
  QUIZY_STATS,
  EDIT_PROFILE,
  BIO_DATA,
}

export const tabs = [
  {
    id: TAB_TYPE.QUIZY_STATS,
    name: "Quizy stats",
    path: "/",
    icon: "home",
    isActive: true,
  },
  {
    id: TAB_TYPE.EDIT_PROFILE,
    name: "Edit profile",
    path: "/",
    icon: "home",
    isActive: true,
  },
  {
    id: TAB_TYPE.BIO_DATA,
    name: "Bio data",
    path: "/",
    icon: "home",
    isActive: true,
  },
];