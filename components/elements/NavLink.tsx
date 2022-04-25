/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:27:33 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  link: {
    name: string;
    url: string;
    icon: IconType;
  };
}

const NavLink: React.FC<Props> = ({ link }) => {
  return (
    <Link href={link.url} key={link.name}>
      <a className="flex items-center p-3 font-medium text-blue-500 rounded-md focus:outline-none focus:shadow-md hover:shadow-md">
        <link.icon size={28} />
        <p className="pl-1">{link.name}</p>
      </a>
    </Link>
  );
};

export default NavLink;
