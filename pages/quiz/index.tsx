/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Apr 18 2022 20:26:28 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { signIn, useSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../../components/modules/Layout";
import QuizCard from "../../components/modules/QuizCard";
import { Quiz } from "../../types";
import { fetcher } from "../../utils/fetcher";

const QuizHome = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  // get all the user bio data from db
  const { data: student } = useSWR(
    session
      ? `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`
      : null,
    fetcher,
    { errorRetryCount: 0 },
  );

  // get all the quizzes of semster and branch
  const { data, isValidating: updatingQuizzes } = useSWR(
    student
      ? `${process.env.NEXT_PUBLIC_API_URL}/quiz/all/semester/${student.bioData.semester}/branch/${student.bioData.branch}`
      : null,
    fetcher,
    { errorRetryCount: 0 },
  );

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        {/* list all the quizzes of semster and branch */}
        {!data && updatingQuizzes && <div>refreshing quizzes...</div>}
        {data && !updatingQuizzes && (
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

export default QuizHome;
