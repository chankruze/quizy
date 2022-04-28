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
import { createContext, useState } from "react";
import TabHeader from "../components/modules/profile-tab/TabHeader";
import TabPage from "../components/modules/profile-tab/ProfileTabPage";
import axios from "axios";

export type Tab = {
  id: number;
  name: string;
  path: string;
  icon: string;
  isActive: boolean;
};

interface Props {
  studentId: string | null | undefined;
}

export const StudentContext = createContext(
  {} as { studentId: string | null | undefined },
);

const Profile = ({ studentId }: Props) => {
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
      <main className="flex flex-col w-full flex-1 px-2 sm:px-4">
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
          <StudentContext.Provider
            value={{
              studentId,
            }}
          >
            <div className="flex-1 flex">
              <TabPage tab={activeTab} />
            </div>
          </StudentContext.Provider>
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

  try {
    // get the student profile
    const { data: student } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session.user?.email}`,
    );

    console.log(student);

    return { props: { session, studentId: student._id } };
  } catch (error) {
    // if student not found, send null
    return { props: { session, studentId: null } };
  }
}

export default Profile;
