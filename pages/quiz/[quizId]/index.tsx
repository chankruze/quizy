/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 21 2022 17:08:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
import { getSession, signIn, useSession } from "next-auth/react";
import axios from "axios";
import Layout from "../../../components/modules/Layout";
import InvalidQuiz from "../../../components/modules/quiz/InvalidQuiz";
import InvalidStudent from "../../../components/modules/quiz/InvalidStudent";
import QuestionView from "../../../components/modules/quiz/QuestionView";
// types
import { NextPageContext } from "next";
import { Quiz } from "../../../types";
import { Student } from "../../../types/student";
import { Answer } from "../../../types/submission";
import moment from "moment";

interface QuizPageProps {
  student: Student;
  quiz: Quiz;
  alreadyAttempted: boolean;
}

const Quiz = ({ student, quiz, alreadyAttempted }: QuizPageProps) => {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  // if quiz is invalid
  if (!quiz) {
    return <InvalidQuiz message="Quiz don't exist!" />;
  }

  // if student is invalid
  if (!student) {
    return <InvalidStudent />;
  }

  // check quiz time validity
  // check if quiz is expired
  if (moment(moment(quiz.endDate)).isBefore(moment())) {
    return <InvalidQuiz message="Date & Time for this quiz has expired 😭" />;
  }

  // check if quiz is not started
  if (moment(quiz.startDate).isAfter(moment())) {
    return <InvalidQuiz message="Plese wait for the quiz to start 🙂" />;
  }

  // student verification status
  // pending
  if (student.verification === "pending") {
    return <InvalidStudent message="Your bio data verification is pending." />;
  }

  // if student is not verified
  // rejected
  if (student.verification === "rejected") {
    return (
      <InvalidStudent message="Your bio data is rejected. Please correct your details" />
    );
  }

  // student belongs to the same branch and semester as the quiz
  if (
    student.bioData.semester !== quiz?.semester &&
    student.bioData.branch !== quiz?.branch
  ) {
    return (
      <InvalidStudent message="The quiz is not for your branch or semester" />
    );
  }

  // student is not already attempted the quiz
  if (student && alreadyAttempted) {
    return <InvalidStudent message="You have already attempted this quiz." />;
  }

  const submit = (answer: Answer) => {
    // send the answers to the server
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/submission/quiz/${quiz._id}`, {
        answer: answer,
        studentId: student._id,
        quizId: quiz._id,
        date: new Date(),
      })
      .then((res) => {
        if (res.status === 201) {
          Router.push(`/quiz/${quiz._id}/result/${res.data.submissionId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout className="h-screen w-full bg-gray-100">
      <main className="h-full bg-white flex flex-col w-full max-w-6xl m-auto">
        {/* header */}
        <div className="h-16 flex items-center justify-between p-3 sm:px-3 bg-gray-800">
          {/* quiz title */}
          <p className="text-gray-300 font-poppins sm:text-xl">{quiz.title}</p>
        </div>
        {/* question view */}
        <QuestionView questions={quiz.questions} submit={submit} />
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // get session data
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const quizId = context.query.quizId;
  let student: Student | null = null;
  let quiz: Quiz | null = null;
  let alreadyAttempted = true;

  // get student data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`,
    );
    // assign student data to student variable
    student = data;
  } catch (err) {
    student = null;
  }

  // get quiz data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/${quizId}/live`,
    );
    quiz = data;
  } catch (err) {
    quiz = null;
  }

  // if student and quiz data is available, check if the student has already attempted the quiz
  if (student && quiz) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/submission/quiz/${quizId}/student/${student._id}`,
      );

      // if the student has already attempted the quiz, set alreadyAttempted to true
      if (data.length > 0) {
        alreadyAttempted = true;
      } else {
        alreadyAttempted = false;
      }
    } catch (err) {
      alreadyAttempted = false;
    }
  }

  return {
    props: { session, student, quiz, alreadyAttempted },
  };
}

export default Quiz;
