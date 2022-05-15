/*
Author: chankruze (chankruze@gmail.com)
Created: Sun May 15 2022 08:16:51 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { Option } from "../../../types";

interface OptionProps {
  option: Option;
  onClick: (value: string) => void;
  isSelected: boolean;
}

const Option: React.FC<OptionProps> = ({ option, onClick, isSelected }) => {
  return (
    <div
      key={option.id}
      data-optionid={option.id}
      onClick={(e) => onClick(e.currentTarget.dataset.optionid as string)}
      className={`flex items-center p-4 border-2 rounded-md cursor-pointer 
      ${
        isSelected
          ? "text-blue-500 border-blue-500"
          : "text-gray-500 border-gray-200"
      }`}
    >
      {isSelected ? (
        <RiCheckboxCircleFill size={24} />
      ) : (
        <RiCheckboxBlankCircleLine size={24} />
      )}
      <p className="pl-2 font-roboto">{option.value}</p>
    </div>
  );
};

export default Option;
