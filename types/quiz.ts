/*
Author: chankruze (chankruze@gmail.com)
Created: Mon May 16 2022 22:01:28 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Option = {
  id: string;
  label: string;
  value: string;
};

export type Question = {
  id: string;
  title: string;
  options: Array<Option>;
  answer: string | number;
};

export type MinifiedQuestion = {
  id: string;
  title: string;
  options: Array<Option>;
};

export type Quiz = {
  _id: string;
  title: string;
  description: string;
  branch: string;
  semester: string;
  startDate: string;
  endDate: string;
  questions: Array<Question>;
  questionsCount?: number;
};
