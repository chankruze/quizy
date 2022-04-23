/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:23:19 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Spinner from "./Spinner";

interface Props {
  label: string;
  isDisabled: boolean;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<Props> = ({ label, isDisabled, isSubmitting }) => {
  return (
    <button
      type="submit"
      className="w-full p-3 flex items-center gap-1 justify-center capitalize rounded-md 
      text-white bg-blue-600 hover:bg-blue-500 duration-150 
      disabled:cursor-not-allowed disabled:bg-gray-200"
      disabled={isDisabled}
    >
      {isSubmitting && <Spinner />}
      <p className="text-lg">{label}</p>
    </button>
  );
};

export default SubmitButton;
