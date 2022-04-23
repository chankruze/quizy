import { useSession, signIn } from "next-auth/react";
import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/modules/Layout";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [isBioDataCompleted, setIsBioDataCompleted] = useState(false);

  // TODO: add function to check if the user has filled the bio data form

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex w-full flex-1 py-2 px-2 sm:px-4">
        <div className="text-center lg:text-left md:max-w-2xl md:m-auto px-4 md:px-10">
          <h1
            className="text-4xl tracking-tight leading-10 font-extrabold font-poppins
          text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
          >
            {/* Welcome to <span className="text-green-500">{config.APP_NAME}</span> */}
            Submit Biodata,
            <br />
            without the <span className="text-blue-600">tears.</span>
          </h1>
          <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
            Quizzes conducted requires your bio data to be verified. Signin with
            just your email in seconds!
          </p>
          <div className="mt-4">
            <button
              className="w-full md:w-auto flex items-center justify-center text-base 
                leading-6 font-medium rounded-md text-white bg-blue-600 
                hover:bg-blue-500 duration-150 ease-in-out cursor-pointer
                py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
              onClick={() => signIn()}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="flex-1"></div>

        {/* {status === "authenticated" && (
          <div>
            <ProfileData session={session} />
            <div className="flex justify-center">
              {!isBioDataCompleted && (
                <Link href="/bio-data">
                  <a
                    className="flex items-center py-4 px-8 rounded-md capitalize text-xl 
                    text-white bg-green-500 hover:bg-green-500/90 font-poppins"
                    onClick={() => console.log("Redirect to the bio data form")}
                  >
                    <p className="mr-2">fill your bio data</p>
                  </a>
                </Link>
              )}
            </div>
          </div>
        )} */}
      </main>
    </Layout>
  );
};

export default Home;
