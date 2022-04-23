/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:19:27 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ErrorMessage, Field } from "formik";
import Link from "next/link";
import ErrorDiv from "./ErrorDiv";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  smallLabel?: boolean;
  disabled?: boolean;
  disabledMessage?: any;
}

const Input: React.FC<Props> = ({
  id,
  name,
  label,
  placeholder,
  smallLabel = false,
  disabled = false,
  disabledMessage,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`${smallLabel ? "text-sm" : "text-lg"} font-medium`}
      >
        {label}
        {disabled && disabledMessage && (
          <Link href="/profile">
            <a className="italic text-xs text-blue-500 hover:text-blue-400 pl-2">
              {disabledMessage}
            </a>
          </Link>
        )}
      </label>
      <Field
        id={id}
        as="input"
        name={name}
        className={`my-1 px-3 py-2 w-full border text-lg rounded-md outline-none 
        focus:border-blue-500 ${
          disabled ? "cursor-not-allowed bg-gray-100" : "bg-white"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
      <ErrorMessage name={name} component={ErrorDiv} />
    </div>
  );
};

export default Input;
