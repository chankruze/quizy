/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:20:18 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

interface Props {
  htmlFor: string;
  value: string;
}

const Label: React.FC<Props> = ({ htmlFor, value }) => {
  return (
    <label htmlFor={htmlFor} className="text-lg font-medium">
      {value}
    </label>
  );
};

export default Label;
