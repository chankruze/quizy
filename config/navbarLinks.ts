/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:13:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { GoHome, GoBeaker, GoDatabase, GoPerson } from "react-icons/go";

export const navbarLinks = [
  {
    name: "Home",
    url: "/",
    icon: GoHome,
  },
  {
    name: "Bio-data",
    url: "/bio-data",
    icon: GoDatabase,
  },
  {
    name: "Quizzes",
    url: "/quiz",
    icon: GoBeaker,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: GoPerson,
  },
];
