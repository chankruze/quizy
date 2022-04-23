/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 21 2022 17:08:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../../components/modules/Layout";
import InvalidQuiz from "../../../components/modules/quiz/InvalidQuiz";
import { fetcher } from "../../../utils/fetcher";

const Quiz = () => {
  const { id } = useRouter().query;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  const { data: student } = useSWR(
    session
      ? `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`
      : null,
    fetcher,
    { errorRetryCount: 0 },
  );

  const { data } = useSWR(
    session ? `${process.env.NEXT_PUBLIC_API_URL}/quiz/${id}` : null,
    fetcher,
    { errorRetryCount: 0 },
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // check if the student is verified
  if (student && student.verification !== "verified") {
    return (
      <Layout navbar>
        <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
          <div className="text-center bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl font-bold">
              Your bio data is not verified. Please submit bio data for
              verification.
            </h1>
            <p>Once verified, you will be able to attend quiz.</p>
          </div>
        </main>
      </Layout>
    );
  }

  // check if the student's semester matches quiz's semester
  if (
    student &&
    data &&
    student.bioData.semester !== data.quiz.semester &&
    student.bioData.branch !== data.quiz.branch
  ) {
    return <InvalidQuiz />;
  }

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        {/* Render quiz to attempt  */}
        {data && data.quiz && JSON.stringify(data.quiz)}
      </main>
    </Layout>
  );
};

export default Quiz;
