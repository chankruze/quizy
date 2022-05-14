/*
Author: chankruze (chankruze@gmail.com)
Created: Sat May 14 2022 22:43:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";

interface Props {
  href: string;
  text: string;
  color?: string;
}

const LinkButton: React.FC<Props> = ({ href, text, color }) => {
  return (
    <Link href={href} passHref>
      <a
        className={`w-full md:w-auto flex items-center justify-center text-base leading-6 font-medium shadow-md
        rounded-md duration-150 ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0
        ${color ? color : "bg-blue-600 text-white  hover:hover:bg-blue-500"}`}
      >
        {text}
      </a>
    </Link>
  );
};

export default LinkButton;
