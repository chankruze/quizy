/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 14:20:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Router from "next/router";
import { useSession, signIn, getSession } from "next-auth/react";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { User } from "../types/user";
// components
import Layout from "../components/modules/Layout";
import Input from "../components/formik-controls/Input";
import SubmitButton from "../components/formik-controls/SubmitButton";
import { NextPageContext } from "next";

const Profile = () => {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (!session) {
    signIn();
    return null;
  }

  const { email, name, image } = session?.user as User;

  // initial values
  const initialValues = {
    name: name || "",
    email: email,
    image: image || "",
  };

  // validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    // image: Yup.string().required("Image is required"),
  });

  // on submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: FormikValues, formikBag: any) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/user/${email}`, values)
      .then((res) => {
        if (res.status === 200) {
          formikBag.setSubmitting(false);
          formikBag.resetForm();
          Router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full flex-1 py-2 px-2 sm:px-4">
        <div className="w-full sm:w-[400px] m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formikHelpers) => (
              <Form>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  label="Email"
                />

                <Input id="name" name="name" placeholder="Name" label="Name" />

                <Input
                  id="image"
                  name="image"
                  placeholder="Image"
                  label="Image"
                />

                <div className="mt-4">
                  <SubmitButton
                    label="Update"
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
        </div>
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

  return { props: { session } };
}

export default Profile;
