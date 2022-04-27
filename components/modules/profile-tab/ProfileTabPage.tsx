/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 07:10:15 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { TAB_TYPE } from "../../../config/tabs";
import { Tab } from "../../../pages/profile";
import BioDataTab from "./BioDataTab";
import EditProfileTab from "./EditProfileTab";
import QuizyStatsTab from "./QuizyStatsTab";

interface TabProps {
  tab: Tab;
}

const TabPage: React.FC<TabProps> = ({ tab }) => {
  switch (tab.id) {
    case TAB_TYPE.QUIZY_STATS:
      return <QuizyStatsTab />;

    case TAB_TYPE.EDIT_PROFILE:
      return <EditProfileTab />;

    case TAB_TYPE.BIO_DATA:
      return <BioDataTab />;

    default:
      return <QuizyStatsTab />;
  }
};

export default TabPage;
