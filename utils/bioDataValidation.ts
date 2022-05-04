/*
Author: chankruze (chankruze@gmail.com)
Created: Thu May 05 2022 00:11:03 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .trim("Can't include leading and/or trailing spaces")
    .strict(true)
    .required("Name is required"),
  // photo: Yup.string().required("Image is required"),
  fatherName: Yup.string()
    .trim("Can't include leading and/or trailing spaces")
    .strict(true)
    .required("Father's name is required"),
  branch: Yup.string().required("Branch is required"),
  semester: Yup.string().required("Semester is required"),
  regdNo: Yup.string()
    .matches(
      /^[FL]\d{11}$/gm,
      "Registration no. must be in the format FXXXXXXXXXX or LXXXXXXXXXX",
    )
    .trim("Can't include leading and/or trailing spaces")
    .strict(true),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("DOB is required"),
  caste: Yup.string().required("Caste is required"),
  mob: Yup.string()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
      "Invalid mobile number",
    )
    .trim("Can't include leading and/or trailing spaces")
    .strict(true)
    .required("Mobile number is required"),
  fatherMob: Yup.string()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm,
      "Invalid mobile number",
    )
    .trim("Can't include leading and/or trailing spaces")
    .strict(true)
    .required("Mobile number is required"),
});
