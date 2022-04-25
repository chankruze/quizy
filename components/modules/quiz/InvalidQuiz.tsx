/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Apr 23 2022 11:31:17 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import React from "react";
import Layout from "../Layout";

const InvalidQuiz = () => {
  return (
    <Layout navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        <div className="text-center bg-gray-200 p-3 rounded-md">
          <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            Quiz does not exists!
            <br /> Please contact with college/teacher.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default InvalidQuiz;
