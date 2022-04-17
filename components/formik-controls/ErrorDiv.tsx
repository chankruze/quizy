/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 14 2022 21:18:50 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const ErrorDiv: React.FC = ({ children }) => {
  return <p className="text-right text-red-600 text-sm">{children}</p>;
};

export default ErrorDiv;
