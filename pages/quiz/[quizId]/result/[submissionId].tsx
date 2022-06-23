/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 23 2022 13:09:36 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { useRef } from "react";
import { NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";
import ReactToPrint from "react-to-print";
import Layout from "../../../../components/modules/Layout";
import KVText from "../../../../components/elements/KVText";
import ResultOption from "../../../../components/modules/quiz/ResultOption";
import Divider from "../../../../components/elements/Divider";
// utils
import { calculateScore, quizIsExpired } from "../../../../utils";
// types
import { Quiz } from "../../../../types";
import { Student } from "../../../../types/student";
import { Submission } from "../../../../types/submission";
import { MdPrint } from "react-icons/md";

interface SubmissionPageProps {
  quiz: Quiz;
  submission: Submission;
}

const Result = ({ quiz, submission }: SubmissionPageProps) => {
  const { data: session } = useSession();
  const componentRef = useRef(null);

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  // quiz is ended or not
  const quizEnded = quizIsExpired(quiz);
  // calculate the score
  const score = calculateScore(quiz.questions, submission);
  // answered questions count
  const attemptedCount = Object.values(submission.answer).filter(
    (val) => val !== "",
  ).length;

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      {quizEnded && (
        <ReactToPrint
          trigger={() => (
            <button className="flex items-center justify-center gap-2 p-2 bg-blue-600 text-white">
              <MdPrint size={24} />
              <p>Print this out!</p>
            </button>
          )}
          content={() => componentRef.current}
        />
      )}
      <main
        className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4"
        ref={componentRef}
      >
        {quizEnded ? (
          <div>
            <div className="bg-green-100 rounded-md mx-2 py-2">
              <div className="pb-2 text-center py-2 px-3">
                <p className="text-gray-900 font-black font-montserrat sm:text-xl">
                  {quiz.title}
                </p>
                <p className="pt-2 text-gray-600 font-roboto">
                  {quiz.description}
                </p>
              </div>
              <Divider />
              <div className="flex flex-col md:grid md:grid-cols-3 justify-evenly gap-2 py-2 px-3">
                {/* <p>Branch: {quiz.branch}</p> */}
                <KVText
                  data={{
                    key: "Branch",
                    value: quiz.branch,
                  }}
                />
                <KVText
                  data={{
                    key: "Semester",
                    value: quiz.semester,
                  }}
                />
                <KVText
                  data={{
                    key: "No. Questions",
                    value: quiz.questionsCount as number,
                  }}
                />
                <KVText
                  data={{
                    key: "Attempted",
                    value: attemptedCount,
                  }}
                />
                <KVText
                  data={{
                    key: "Start Date",
                    value: moment(quiz.startDate).format("DD-MM-YYYY HH:mm A"),
                  }}
                />
                <KVText
                  data={{
                    key: "End Date",
                    value: moment(quiz.endDate).format("DD-MM-YYYY HH:mm A"),
                  }}
                />
              </div>
            </div>
            {/* answer keys */}
            {quiz.questions.map((question, _idx) => (
              <div key={question.id} className="flex-1 flex flex-col py-2 px-3">
                {/* question */}
                <p className="text-xl font-roboto font-bold sm:p-3">
                  {_idx + 1}. {question.title}
                </p>
                {/* answer */}
                <div className="pt-3 md:px-3 flex flex-col md:grid md:grid-cols-2 justify-evenly gap-2">
                  {question.options.map((option) => (
                    <ResultOption
                      key={option.id}
                      option={option}
                      isSelected={submission.answer[question.id] === option.id}
                      isCorrect={
                        option.id ===
                        question.options[parseInt(question.answer as string)].id
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-4">
            {/* replace with report card */}
            <p className="text-3xl font-nunito">Your score is</p>
            <p
              className="py-4 px-8 inline-block rounded-md bg-blue-600 font-montserrat 
            font-bold text-8xl text-white"
            >
              {score}
            </p>
            <p className="text-xl font-poppins">
              You will have your report card once the quiz is ended 😊.
            </p>
          </div>
        )}
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

  let quiz: Quiz | null;
  let submission: Student | null;

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
      quiz,
      submission,
    },
  };
}

export default Result;
