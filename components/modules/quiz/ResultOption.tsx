/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 23 2022 21:21:30 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import {
  RiAccountCircleLine,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiCloseCircleLine,
} from "react-icons/ri";
import { Option } from "../../../types";

interface OptionProps {
  option: Option;
  isSelected: boolean;
  isCorrect: boolean;
}

const ResultOption: React.FC<OptionProps> = ({
  option,
  isSelected,
  isCorrect,
}) => {
  return (
    <div
      key={option.id}
      data-optionid={option.id}
      className={`flex items-center p-4 border-2 rounded-md select-none 
        ${isSelected && "text-blue-500 border-blue-500"}
        ${
          isCorrect
            ? "text-green-500 border-green-500 bg-green-50"
            : "text-red-500 border-red-200 bg-red-50"
        }
        `}
    >
      {isCorrect ? (
        <RiCheckboxCircleFill size={24} />
      ) : (
        <RiCloseCircleLine size={24} />
      )}
      <p className="pl-2 font-roboto">{option.value}</p>
      {isSelected && isCorrect && <p className="ml-auto font-roboto">+1</p>}
    </div>
  );
};

export default ResultOption;
