/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Apr 23 2022 10:56:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
import React from "react";
import moment from "moment";
import Badge from "./Badge";
import { FcCalendar } from "react-icons/fc";
import { Quiz } from "../../types";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const isExpired = moment(quiz.endDate).isBefore(moment());
  const isUpcoming = moment(quiz.startDate).isAfter(moment());
  const isOngoing = moment(moment()).isBetween(
    moment(quiz.startDate),
    moment(quiz.endDate),
  );

  const handleClick = () => Router.push(`/quiz/${quiz._id}`);

  return (
    <div
      className="p-4 w-full rounded-md cursor-pointer shadow-md 
      bg-gradient-to-tr from-blue-600 to-indigo-600 duration-150 ease-in-out"
      onClick={handleClick}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        {/* date */}
        <div className="flex items-center gap-2">
          {/* start date */}
          <Badge bgColor="bg-green-200">
            <FcCalendar size={24} />
            {moment(quiz.startDate).format("MM-DD-YYYY, hh:mm A")}
          </Badge>
          {/* end date  */}
          <Badge bgColor="bg-red-200">
            <FcCalendar size={24} />
            {moment(quiz.endDate).format("MM-DD-YYYY, hh:mm A")}
          </Badge>
        </div>
        {/* badge */}
        <div className="flex items-center">
          {/* status */}
          {isExpired && (
            <Badge bgColor="bg-red-500" color="text-white" uppercase>
              expired
            </Badge>
          )}
          {isUpcoming && (
            <Badge bgColor="bg-blue-500" color="text-white" uppercase>
              upcoming
            </Badge>
          )}
          {isOngoing && (
            <Badge bgColor="bg-green-500" color="text-white" uppercase>
              ongoing
            </Badge>
          )}
        </div>
      </div>
      {/* title */}
      <p className="py-2 sm:text-xl font-poppins text-white">{quiz.title}</p>
    </div>
  );
};

export default QuizCard;
