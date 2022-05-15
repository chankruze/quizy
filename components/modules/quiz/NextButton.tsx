/*
Author: chankruze (chankruze@gmail.com)
Created: Sun May 15 2022 10:43:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Spinner from "../../elements/Spinner";

interface NextButtonProps {
  onClick: () => void;
  text: string;
  isSubmitting?: boolean;
  style?: string;
}

const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  text,
  isSubmitting,
  style,
}) => {
  return (
    <button
      className={`h-16 border-t tracking-wider flex items-center justify-center text-xl font-nunito font-semibold 
      ${style ? style : "text-white bg-blue-600 hover:bg-blue-500"}
      duration-150 cursor-pointer disabled:pointer-events-none disabled:bg-opacity-50`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting && <Spinner />}
      <p className="uppercase text-sm">{text}</p>
    </button>
  );
};

export default NextButton;
