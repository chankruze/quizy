/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:26:28 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";
import { NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import Spinner from "../../components/formik-controls/Spinner";
import Layout from "../../components/modules/Layout";
import QuizCard from "../../components/elements/QuizCard";
import { Quiz } from "../../types";
import { Student } from "../../types/student";
import { fetcher } from "../../utils/fetcher";

interface QuizHomeProps {
  student: Student;
}

const QuizHome = ({ student }: QuizHomeProps) => {
  const { data: session } = useSession();

  // get all the quizzes of semster and branch
  const { data, isValidating } = useSWR(
    session && student
      ? `${process.env.NEXT_PUBLIC_API_URL}/quiz/all/semester/${student.bioData.semester}/branch/${student.bioData.branch}`
      : null,
    fetcher,
  );

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  const xyz = "pending";

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 p-2 sm:p-4">
        {/* refreshing quizzes */}
        {isValidating && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center text-lg p-4 text-white bg-blue-600 rounded-md">
              <Spinner />
              <p>Refreshing...</p>
            </div>
          </div>
        )}

        {/* if quizzes not found */}
        {!isValidating && !student && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
              To see and attend quizzes, your bio data must be verified.
              <br /> You have not filled your bio data yet.
            </p>
            <div className="md:inline-block">
              <Link href="/bio-data" passHref>
                <a
                  className="w-full md:w-auto flex items-center justify-center text-base text-white
                  leading-6 font-medium rounded-md bg-blue-600 shadow-md hover:bg-blue-600/90 duration-150 
                  ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
                >
                  Submit Biodata
                </a>
              </Link>
            </div>
          </div>
        )}

        {!isValidating && student && student.verification === "pending" && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="p-4 text-center text-base text-gray-700 font-nunito sm:mt-4 sm:text-xl lg:text-lg xl:text-xl">
              To see and attend quizzes, your bio data must be verified.
              <br /> Your bio data verification is pending.
            </p>
            <div className="md:inline-block">
              <Link href="/bio-data" passHref>
                <a
                  className="w-full md:w-auto flex items-center justify-center text-base
                  leading-6 font-medium rounded-md bg-white shadow-md hover:bg-gray-100 duration-150 
                  ease-in-out cursor-pointer py-3 px-8 md:py-4 md:text-lg md:px-10 mx-auto lg:mx-0"
                >
                  Check Status
                </a>
              </Link>
            </div>
          </div>
        )}

        {/* list all the quizzes of semster and branch only if the student is verified */}
        {!isValidating && student && student.verification === "verified" && (
          <div>
            {data.quizzes.map((quiz: Quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
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

  try {
    // get the student profile
    const { data: student } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session.user?.email}`,
    );

    return { props: { session, student } };
  } catch (error) {
    // if student not found, send null
    return { props: { session, student: null } };
  }
}

export default QuizHome;
