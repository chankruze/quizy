/*
Author: chankruze (chankruze@gmail.com)
Created: Sun May 01 2022 20:30:50 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import React from "react";

interface BadgeProps {
  color?: string;
  bgColor?: string;
  textSize?: string;
  uppercase?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color,
  bgColor,
  textSize,
  uppercase,
}) => {
  return (
    <p
      className={`flex items-center gap-1 py-1 px-2 rounded-md font-nunito 
      ${uppercase && "uppercase"}
      ${textSize ? textSize : "text-sm"}
      ${color && color}
      ${bgColor ? bgColor : "bg-green-200"}`}
    >
      {children}
    </p>
  );
};

export default Badge;
