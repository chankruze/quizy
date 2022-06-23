import { signIn, getSession, useSession } from "next-auth/react";
import type { NextPageContext } from "next";
import Layout from "../components/modules/Layout";
import axios from "axios";
import { Student } from "../types/student";
import Image from "next/image";
import LinkButton from "../components/elements/LinkButton";

interface Props {
  student: Student;
}

const Home = ({ student }: Props) => {
  const { data: session } = useSession();

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-wrap-reverse w-full flex-1 py-2 px-2 sm:px-4">
        <div className="md:flex-1 flex justify-end">
          <div className="text-center m-auto px-4 lg:px-20 lg:text-left lg:my-auto lg:mx-0">
            {/* user not signed in */}
            {!session && (
              <>
                <h1
                  className="text-4xl tracking-tight leading-10 font-extrabold font-poppins 
                text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
                >
                  Submit Biodata
                  <br />
                  without the <span className="text-blue-600">tears.</span>
                </h1>
                <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
                  Quizzes conducted requires your bio data to be verified.
                  Signin with just your email in seconds!
                </p>
                <button
                  className="mt-4 w-full md:w-auto flex items-center justify-center text-base 
                  leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 duration-150 ease-in-out cursor-pointer 
                  py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
                  onClick={() => signIn()}
                >
                  Get Started
                </button>
              </>
            )}
            {/* user signed in & not a student (not filled bio-data) */}
            {session && !student && (
              <>
                <h1
                  className="text-4xl tracking-tight leading-10 font-extrabold font-poppins 
                text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
                >
                  Welcome 👋
                </h1>
                <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
                  To attend a quiz your bio data to be verified 🙂. You just
                  need your email to signin and fill your bio data 😉
                </p>
                <div className="mt-4 md:inline-block">
                  <LinkButton href="/bio-data" text="Fill Biodata" />
                </div>
              </>
            )}

            {/* user signed in, submitted bio-data but not verified */}
            {session && student && student.verification === "pending" && (
              <>
                <h1
                  className="text-4xl tracking-tight leading-10 font-extrabold font-poppins 
                text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
                >
                  Hello 👋
                  <br />
                  <span className="text-blue-600 text-3xl sm:text-5xl">
                    {student.bioData.name
                      ? student.bioData.name
                      : session.user?.email}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
                  Your bio data verification is still pending 🙄
                </p>
                <div className="md:inline-block mt-4">
                  <LinkButton href="/bio-data" text="Check Status" />
                </div>
              </>
            )}

            {/* user signed in, submitted bio-data and verified */}
            {session && student && student.verification === "verified" && (
              <>
                <h1
                  className="text-4xl tracking-tight leading-10 font-extrabold font-poppins 
                text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
                >
                  Welcome 👋
                  <br />
                  <span className="text-blue-600 text-3xl sm:text-5xl">
                    {student.bioData.name
                      ? student.bioData.name
                      : session.user?.email}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
                  You can now attend quizzes 🎉. Always keep your bio data
                  updated 🙂
                </p>
                <div className="mt-4 flex gap-4 flex-wrap justify-center lg:justify-start">
                  <div className="md:inline-block">
                    <LinkButton href="/quiz" text="Attend Quizzes" />
                  </div>
                  <div className="md:inline-block">
                    <LinkButton
                      href="/bio-data"
                      text="Update Biodata"
                      color="bg-white shadow-md hover:bg-gray-100"
                    />
                  </div>
                </div>
              </>
            )}

            {/* user signed in, submitted bio-data but rejected */}
            {session && student && student.verification === "rejected" && (
              <>
                <h1
                  className="text-4xl tracking-tight leading-10 font-extrabold font-poppins 
                text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
                >
                  Welcome 👋
                  <br />
                  <span className="text-blue-600 text-5xl">
                    {student.bioData.name
                      ? student.bioData.name
                      : session.user?.email}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
                  Your bio data got rejected 😬. Please fill your bio data again
                  or contact college for more information.
                </p>
                <div className="md:inline-block mt-4">
                  <LinkButton href="/bio-data" text="Update Biodata" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 px-4 sm:px-0 flex justify-center items-center">
          <Image
            src="/undraw-exams.svg"
            height={650}
            width={650}
            alt="hero image"
          />
        </div>
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
      { timeout: 4000 },
    );

    return { props: { session, student } };
  } catch (error) {
    // if student not found, send null
    return { props: { session, student: null } };
  }
}

export default Home;
