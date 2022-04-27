/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 07:14:46 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Tab } from "../../../pages/profile";

interface TabHeaderProps {
  tab: Tab;
  onClick: (tab: Tab) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ tab, onClick }) => {
  return (
    <div
      className={`p-3 bg-white cursor-pointer border-b-2 font-bold font-nunito
      whitespace-nowrap
      ${
        tab.isActive
          ? "text-black border-blue-500"
          : "text-gray-400 border-transparent"
      }`}
      onClick={() => onClick(tab)}
    >
      {tab.name}
    </div>
  );
};

export default TabHeader;
