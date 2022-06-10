/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 27 2022 06:39:24 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../../formik-controls/Input";
import SubmitButton from "../../formik-controls/SubmitButton";
import { reloadSession } from "../../../utils";
import { useSession } from "next-auth/react";
import { User } from "../../../types/user";

const EditProfileTab = () => {
  const { data: session } = useSession();

  if (!session) return null;

  const { email } = session.user as User;

  // initial values
  const initialValues = {
    email: email || "",
  };

  // validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
  });

  // on submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: FormikValues, formikBag: any) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/user/${email}`, values)
      .then((res) => {
        if (res.status === 200) {
          formikBag.setSubmitting(false);
          reloadSession();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full md:max-w-md md:m-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikHelpers) => (
          <Form>
            <Input id="email" name="email" placeholder="Email" label="Email" />
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
  );
};

export default EditProfileTab;
