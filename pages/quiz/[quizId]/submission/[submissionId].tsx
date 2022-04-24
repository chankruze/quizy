/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 24 2022 14:14:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../../../components/modules/Layout";
import { Quiz } from "../../../../types";
import { Student } from "../../../../types/student";
import { Submission } from "../../../../types/submission";
// hooks
import { useWindowSize } from "react-use";
// libs
import Confetti from "react-confetti";

interface SubmissionPageProps {
  student: Student;
  quiz: Quiz;
  submission: Submission;
}

const Submission = ({ student, quiz, submission }: SubmissionPageProps) => {
  const { width, height } = useWindowSize();

  // calculate the score
  const score = quiz.questions.reduce((prev, question) => {
    if (
      question.options[parseInt(question.answer as string)].id ===
      submission.answers[question.id]
    ) {
      return prev + 1;
    }

    return prev;
  }, 0);

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        <Confetti width={width - 20} height={height - 20} recycle={false} />
        <div className="flex justify-center items-center flex-col gap-4">
          {/* replace with report card */}
          <p className="text-3xl font-nunito">Your score is</p>
          <p
            className="py-4 px-8 inline-block rounded-md bg-blue-600 font-montserrat 
            font-bold text-8xl text-white"
          >
            {score}
          </p>
        </div>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // get quiz and submission id from url
  const { quizId, submissionId } = context.query;
  // get the session
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  // get the student data
  const { data: student } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`,
  );

  // get the quiz data
  const {
    data: { quiz },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quiz/${quizId}`);

  // get the submission data
  const {
    data: { submission },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/submission/${submissionId}`,
  );

  // pass the props to the component
  return {
    props: {
      student,
      quiz,
      submission,
    },
  };
}

export default Submission;
