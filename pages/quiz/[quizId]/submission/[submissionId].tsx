/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 24 2022 14:14:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";
import { NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Layout from "../../../../components/modules/Layout";
import { Quiz } from "../../../../types";
import { Student } from "../../../../types/student";
import { Submission } from "../../../../types/submission";
// hooks
import { useWindowSize } from "react-use";
// libs
import Confetti from "react-confetti";
import { calculateScore } from "../../../../utils";

interface SubmissionPageProps {
  student: Student;
  quiz: Quiz;
  submission: Submission;
}

const Submission = ({ student, quiz, submission }: SubmissionPageProps) => {
  const { width, height } = useWindowSize();
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  // calculate the score
  const score = calculateScore(quiz.questions, submission);

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

  let student: null | Student = null;
  let quiz: Quiz | null;
  let submission: Student | null;

  // get the student data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`,
    );
    student = data;
  } catch (error) {
    quiz = null;
  }

  // get the quiz data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/${quizId}`,
    );
    quiz = data;
  } catch (error) {
    quiz = null;
  }

  // get the submission data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/submission/${submissionId}`,
    );
    submission = data;
  } catch (err) {
    submission = null;
  }

  return {
    props: {
      student,
      quiz,
      submission,
    },
  };
}

export default Submission;
