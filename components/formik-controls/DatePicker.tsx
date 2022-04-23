/*
Author: chankruze (chankruze@gmail.com)
Created: Fri Apr 15 2022 19:28:22 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Field } from "formik";
import Label from "./Label";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  id: string;
  name: string;
  label: string;
  showTimeSelect?: boolean;
}

const DatePicker: React.FC<Props> = ({ label, id, name, showTimeSelect }) => {
  return (
    <div>
      <Label htmlFor={id} value={label} />
      <Field name={name}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {({ field, form }) => (
          <DateView
            {...field}
            {...form}
            selected={field.value}
            onChange={(date: Date) => form.setFieldValue(field.name, date)}
            id={id}
            dateFormat="dd/MM/yyyy"
            showTimeSelect={showTimeSelect}
            className="my-1 px-3 py-2 w-full bg-white border text-lg rounded-md outline-none focus:border-blue-500"
          />
        )}
      </Field>
    </div>
  );
};

export default DatePicker;
