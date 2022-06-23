/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 21:08:16 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import moment from "moment";
import { Question, Quiz } from "../types";
import { Submission } from "../types/submission";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const sliceId = (id: string) => id.slice(id.length - 7);

export const calculateScore = (
  questions: Array<Question>,
  submission: Submission,
) => {
  return questions.reduce((prev, question: Question) => {
    if (
      question.options[parseInt(question.answer as string)].id ===
      submission.answer[question.id]
    ) {
      return prev + 1;
    }

    return prev;
  }, 0);
};

// expiry check of a quiz
export const quizIsExpired = (quiz: Quiz) => {
  return (
    moment(quiz.startDate).isBefore(moment()) &&
    moment(quiz.endDate).isBefore(moment())
  );
};
