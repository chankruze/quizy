/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 08:05:01 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";

const BioDataTab = () => {
  return (
    <div className="w-full md:max-w-md m-auto">
      <Link href="/bio-data" passHref>
        <a
          className="w-full md:w-auto flex items-center justify-center text-base text-white
          leading-6 font-medium rounded-md bg-blue-600 shadow-md hover:bg-blue-600/80 duration-150 
          ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
        >
          Fill Biodata
        </a>
      </Link>
    </div>
  );
};

export default BioDataTab;
