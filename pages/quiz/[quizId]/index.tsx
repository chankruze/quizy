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
import InvalidStudent from "../../../components/modules/quiz/InvalidStudent";

interface QuizPageProps {
  student: Student;
  quiz: Quiz;
}

const Quiz = ({ student, quiz }: QuizPageProps) => {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  if (!quiz) {
    return <InvalidQuiz />;
  }

  if (!student) {
    return <InvalidStudent />;
  }

  // check if the student is verified
  if (student.verification !== "verified") {
    return <InvalidStudent template="NOT_VERIFIED" />;
  }

  // check if the student is eligible
  if (
    student.bioData.semester !== quiz?.semester &&
    student.bioData.branch !== quiz?.branch
  ) {
    return <InvalidStudent template="NOT_ELIGIBLE" />;
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
  let student: Student | null = null;

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
    const {
      data: { quiz },
    } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quiz/${quizId}`);
    return { props: { session, student, quiz } };
  } catch (err) {
    return { props: { session, student, quiz: null } };
  }
}

export default Quiz;