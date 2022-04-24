/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:26:28 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";
import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import useSWR from "swr";
import Layout from "../../components/modules/Layout";
import QuizCard from "../../components/modules/QuizCard";
import { Quiz } from "../../types";
import { Student } from "../../types/student";
import { fetcher } from "../../utils/fetcher";

interface QuizHomeProps {
  student: Student;
}

const QuizHome = ({ student }: QuizHomeProps) => {
  const { data: session } = useSession();

  // get all the quizzes of semster and branch
  const { data, isValidating: updatingQuizzes } = useSWR(
    session
      ? `${process.env.NEXT_PUBLIC_API_URL}/quiz/all/semester/${student.bioData.semester}/branch/${student.bioData.branch}`
      : null,
    fetcher,
  );

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 p-2 sm:p-4">
        {/* list all the quizzes of semster and branch */}
        {!data && updatingQuizzes && <div>refreshing quizzes...</div>}
        {data && data.quizzes.length > 0 && !updatingQuizzes ? (
          <div>
            {data.quizzes.map((quiz: Quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative">
              <Image
                src="/undraw-no-data.svg"
                alt="fdsfds"
                height={200}
                width={200}
              />
            </div>
            <p className="mt-4 text-xl font-poppins capitalize text-center">
              No quizzes for your branch ({student.bioData.branch}) and semester
              ({student.bioData.semester}).
            </p>
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

  const { data: student } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session.user?.email}`,
  );

  return { props: { session, student } };
}

export default QuizHome;
