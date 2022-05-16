/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 25 2022 20:29:37 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";
import Layout from "../Layout";

interface Props {
  message?: string;
}

const InvalidStudent = ({ message }: Props) => {
  return (
    <Layout navbar>
      <main className="w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        <div className="text-center w-full">
          <p className="p-4 text-base text-red-500 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            {message || "Invalid student"}
          </p>
          <Link href="/quiz" passHref>
            <a
              className="w-full md:w-auto inline-block text-base text-white 
              leading-6 font-medium rounded-md bg-blue-600 shadow-md hover:bg-blue-600/80 duration-150 
              ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto"
            >
              Go back
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default InvalidStudent;
