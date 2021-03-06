/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:27:33 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface Props {
  showIcon?: boolean;
  showText?: boolean;
  link: {
    name: string;
    url: string;
    icon: IconType;
  };
}

const NavLink: React.FC<Props> = ({ link, showIcon, showText }) => {
  const isActive = useRouter().pathname === link.url;

  return (
    <Link href={link.url} key={link.name}>
      <a
        className={`flex items-center justify-center font-medium border-b-2 
        border-transparent hover:border-b-2 hover:border-blue-500 
        ${isActive ? "text-blue-500" : "text-gray-400"}`}
      >
        {showIcon && <link.icon size={28} />}
        {showText && (
          <p className="pl-1 capitalize font-poppins">{link.name}</p>
        )}
      </a>
    </Link>
  );
};

export default NavLink;
