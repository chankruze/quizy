import { useSession, signIn } from "next-auth/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/modules/Layout";
import { config } from "../config";
import ProfileData from "../components/elements/ProfileData";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [isBioDataCompleted, setIsBioDataCompleted] = useState(false);

  // TODO: add function to check if the user has filled the bio data form

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full flex-1 py-2 px-2 sm:px-4">
        <h1 className="text-8xl font-black py-24 mx-auto font-montserrat text-center">
          Welcome to <span className="text-blue-500">{config.APP_NAME}</span>
        </h1>

        {status === "authenticated" && (
          <div>
            <ProfileData session={session} />
            <div className="flex justify-center">
              {/* and if bio data not filled yet, render a button to redirect to the form */}
              {!isBioDataCompleted && (
                <Link href="/user/bio">
                  <a
                    className="flex items-center py-4 px-8 rounded-md capitalize text-xl 
                    text-white bg-blue-500 hover:bg-blue-500/90 font-poppins"
                    onClick={() => console.log("Redirect to the bio data form")}
                  >
                    <p className="mr-2">fill your bio data</p>
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Home;
