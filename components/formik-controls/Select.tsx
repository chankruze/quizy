/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:21:04 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Field } from "formik";
import Label from "./Label";

interface Props {
  id: string;
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
}

const Select: React.FC<Props> = ({ id, name, label, options }) => {
  return (
    <div className="flex-1 flex flex-col">
      <Label htmlFor={id} value={label} />
      <Field
        id={id}
        as="select"
        name={name}
        className="my-1 p-2 flex-1 border focus:outline-none focus:shadow-outline focus:border-green-400 rounded-md"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="capitalize"
          >
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default Select;
