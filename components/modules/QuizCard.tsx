/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Apr 23 2022 10:56:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
import React from "react";
import { Quiz } from "../../types";

interface QuizCardProps {
  quiz: Quiz;
}

// _id: string;
// title: string;
// description: string;
// branch: string;
// semester: string;
// date: string;
// questions: Array<Question>;

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const handleClick = () => Router.push(`/quiz/${quiz._id}`);

  return (
    <div
      className="p-4 w-full rounded-md cursor-pointer border shadow-md
      bg-blue-600 hover:bg-blue-500"
      onClick={handleClick}
    >
      {/* date */}
      <p
        className="inline-block px-2 bg-white rounded-md text-gray-800 
        text-sm font-medium"
      >
        {new Date(quiz.date).toLocaleString()}
      </p>
      <p className="py-2 text-xl font-poppins text-white">{quiz.title}</p>
    </div>
  );
};

export default QuizCard;
