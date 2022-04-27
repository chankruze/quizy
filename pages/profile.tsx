/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 14:20:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { useSession, signIn, getSession, signOut } from "next-auth/react";
// components
import Layout from "../components/modules/Layout";
import { NextPageContext } from "next";
import { tabs } from "../config/tabs";
import { useState } from "react";
import TabHeader from "../components/modules/profile-tab/TabHeader";
import TabPage from "../components/modules/profile-tab/ProfileTabPage";

export type Tab = {
  id: number;
  name: string;
  path: string;
  icon: string;
  isActive: boolean;
};

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full flex-1 py-2 px-2 sm:px-4">
        <div>
          {/* tab headers */}
          {tabs && tabs.length > 0 && (
            <div className="flex gap-4 border-b border-gray-100 overflow-x-auto">
              {tabs.map((tab: Tab) => (
                <TabHeader
                  key={tab.id}
                  tab={{ ...tab, isActive: activeTab.id === tab.id }}
                  onClick={handleTabClick}
                />
              ))}
              <button
                className="ml-auto p-3 text-red-500 font-nunito hover:bg-red-50"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* active tab */}
        {activeTab && (
          <div className="flex-1 flex">
            <TabPage tab={activeTab} />
          </div>
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  return { props: { session } };
}

export default Profile;
