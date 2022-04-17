/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Apr 05 2022 19:54:38 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type OptionType = {
  id: string;
  option: string;
  isCorrect: boolean;
};

export type QuestionType = {
  id: string;
  question: string;
  options: Array<OptionType>;
};

export type QuizType = {
  id: string;
  title: string;
  description: string;
  branch: string;
  semester: string;
  questions: Array<QuestionType>;
};

export type ErrorType = {
  error: string;
};
