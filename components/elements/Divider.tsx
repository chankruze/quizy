/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Apr 19 2022 16:45:03 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

interface Props {
  type?: "solid" | "dotted";
}

const Divider: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "dotted":
      return (
        <div className="w-full h-0 my-2 border-b border-dashed border-gray-200"></div>
      );

    default:
      return <div className="w-full h-[1px] bg-gray-200 my-2"></div>;
  }
};

export default Divider;
