/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 25 2022 20:29:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";

interface Props {
  template?: string;
}

const InvalidStudent = ({ template }: Props) => {
  switch (template) {
    case "NOT_APPLIED":
      return (
        <div className="text-center bg-gray-200 p-3 rounded-md">
          <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            To see and attend quizzes, your bio data must be verified.
            <br /> You have not filled your bio data yet.
          </p>
        </div>
      );

    case "NOT_VERIFIED":
      return (
        <div className="text-center bg-gray-200 p-3 rounded-md">
          <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            To see and attend quizzes, your bio data must be verified.
            <br /> Your bio data verification is pending.
          </p>
          <div className="md:inline-block">
            <Link href="/bio-data" passHref>
              <a
                className="w-full md:w-auto flex items-center justify-center text-base
                  leading-6 font-medium rounded-md bg-white shadow-md hover:bg-gray-100 duration-150 
                  ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
              >
                Check Status
              </a>
            </Link>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-center bg-gray-200 p-3 rounded-md">
          <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            To see and attend quizzes, your bio data must be verified.
            <br /> You have not filled your bio data yet.
          </p>
        </div>
      );
  }
};

export default InvalidStudent;
