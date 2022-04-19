/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 22:44:19 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type BioData = {
  email: string;
  name: string;
  photo?: string;
  fatherName: string;
  branch: string;
  semester: string;
  regdNo: string;
  gender: string;
  dob: string | Date;
  caste: string;
  mob: string;
  fatherMob: string;
};

export type Student = {
  _id?: string;
  bioData: BioData;
  verification: "verified" | "notapplied" | "rejected" | "pending";
  marks?: [];
};
