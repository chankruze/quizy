/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:19:27 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ErrorMessage, Field } from "formik";
import ErrorDiv from "./ErrorDiv";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  smallLabel?: boolean;
}

const Input: React.FC<Props> = ({
  id,
  name,
  label,
  placeholder,
  smallLabel = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`${smallLabel ? "text-sm" : "text-lg"} font-medium`}
      >
        {label}
      </label>
      <Field
        id={id}
        as="input"
        name={name}
        className="my-1 px-3 py-2 w-full bg-white border text-lg rounded-md outline-none focus:border-green-400"
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={ErrorDiv} />
    </div>
  );
};

export default Input;
