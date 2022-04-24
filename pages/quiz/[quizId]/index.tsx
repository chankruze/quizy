/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 21 2022 17:08:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
import axios from "axios";
import { Form, Formik, Field, FormikValues } from "formik";
import { NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Label from "../../../components/formik-controls/Label";
import SubmitButton from "../../../components/formik-controls/SubmitButton";
import Layout from "../../../components/modules/Layout";
import InvalidQuiz from "../../../components/modules/quiz/InvalidQuiz";
import { Option, Question, Quiz } from "../../../types";
import { Student } from "../../../types/student";

interface QuizPageProps {
  student: Student;
  quiz: Quiz;
}

const Quiz = ({ student, quiz }: QuizPageProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  if (typeof window === "undefined") return null;

  if (!quiz) {
    return (
      <Layout navbar>
        <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
          <div className="text-center bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl font-bold">Invalid Quiz</h1>
          </div>
        </main>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout navbar>
        <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
          <div className="text-center bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl font-bold">Invalid student</h1>
          </div>
        </main>
      </Layout>
    );
  }

  // check if the student's semester matches quiz's semester
  if (
    student &&
    quiz &&
    student.bioData.semester !== quiz?.semester &&
    student.bioData.branch !== quiz?.branch
  ) {
    return <InvalidQuiz />;
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

  const initialValues = {
    ...Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      quiz.questions.map((question: Question) => [question.id, ""]),
    ),
  };

  const onSubmit = (values: FormikValues, formikBag: any) => {
    // send the answers to the server
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/submission/quiz/${quiz._id}`, {
        answers: values,
        studentId: student._id,
        quizId: quiz._id,
        date: new Date(),
      })
      .then((res) => {
        if (res.status === 201) {
          formikBag.setSubmitting(false);
          formikBag.resetForm();
          Router.push(`/quiz/${quiz._id}/submission/${res.data.submissionId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        {/* Render quiz to attempt  */}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formikHelpers) => (
            <Form>
              {quiz.questions.map((question: Question, qIdx: number) => (
                <Field name={question.id} key={question.id}>
                  {({ field }: { field: any }) => (
                    <div>
                      <div className="py-2">
                        <Label
                          value={`${qIdx + 1}. ${question.title}`}
                          htmlFor={question.id}
                        />
                      </div>
                      {question.options.map((option: Option) => (
                        <div
                          key={option.id}
                          className="flex items-center py-2 px-4"
                        >
                          <Field
                            {...field}
                            type="radio"
                            name={question.id}
                            value={option.id}
                            className="h-6 w-6"
                          />
                          <p className="pl-2 font-roboto">{option.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>
              ))}
              <div className="mt-8">
                <SubmitButton
                  label="submit"
                  isDisabled={
                    !(formikHelpers.isValid && formikHelpers.dirty) ||
                    formikHelpers.isSubmitting
                  }
                  isSubmitting={formikHelpers.isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
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

  // get quiz data
  const {
    data: { quiz },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quiz/${quizId}`);

  // get student data
  const { data: student } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}`,
  );

  return { props: { session, student, quiz } };
}

export default Quiz;
